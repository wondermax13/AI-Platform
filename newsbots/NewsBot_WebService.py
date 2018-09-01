from flask import Flask, abort, request, Response
import signal
import threading
import time
import os
import requests

import json
import random

import spacy
import newspaper
from newspaper import Article
import nltk
import en_core_web_sm
#import en_core_web_md

app = Flask(__name__)
shuttingDown = False


def exit_call():
    time.sleep(20)
    requests.post("http://localhost:5420/_shutdown")
    # os._exit(0)


def exit_gracefully(self, signum):
    app.logger.error('Received shutdown signal. Exiting gracefully')
    global shuttingDown
    shuttingDown = True
    # TODO: wait for some time here to ensure we are not receiving any more
    # traffic
    _et = threading.Thread(target=exit_call)
    _et.daemon = True
    _et.start()


signal.signal(signal.SIGTERM, exit_gracefully)


@app.route("/")
def hello():
        return "Hello World!"


@app.route("/_status/latestdata")
def retrieveLatestData():

        #TODO - Move all the processing code to a different module
        nltk.download('punkt')

        print(" Loading modules ")

        #nlp = spacy.load('en_core_web_md')
        nlp = spacy.load('en_core_web_sm')


        #article = Article("https://www.zacks.com/stock/news/317469/synaptics-syna-q4-earnings-beat-estimates-revenues-miss?cid=CS-CNN-HL-317469")
        article = Article("https://www.cnbc.com/2018/08/30/microsoft-will-require-partners-suppliers-to-offer-paid-family-leave.html")

        article.download()
        article.parse()
        text = article.text
        print(text)

        print(" Printed text ")

        #NLP using newspaper library
        article.nlp()
        summary = article.summary
        #print(article.summary)
        #print(article.keywords)

        print(" nlp on summary ")

        doc = nlp(summary)
        for token in doc:
            print(token.text, token.pos, token.dep_)

        print(" tokens ")

        stockData = getStockData()

        return Response(json.dumps(stockData), mimetype='application/json')
    
def getStockData():

        stockData = {
                "stock": stockName,
                "score": str(random.randint(51, 100)),
                "history": [
                    82,
                    84,
                    81,
                    53,
                    74,
                    94,
                    65
                ]
            }

        return stockData

@app.route("/_shutdown", methods=["POST"])
def shutdown():
    func = request.environ.get('werkzeug.server.shutdown')
    if func is None:
        return "Not a werkzeug server"
    func()
    return "shutdown"

stockName = "MSFT"
companyName = "Microsoft"

@app.route("/_status/readiness")
def readiness():
        if not shuttingDown:
            return "I am ready"
        else:
            abort(500, 'not ready anymore')


app.run(port=5420)