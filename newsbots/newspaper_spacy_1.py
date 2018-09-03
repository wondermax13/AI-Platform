import spacy
import newspaper
from newspaper import Article
#import nltk

nlp = spacy.load('en')
#nltk.download('punkt')


#nlp = spacy.load('en_core_web_md')
#nlp = spacy.load('en_core_web_sm')


article = Article("https://www.zacks.com/stock/news/317469/synaptics-syna-q4-earnings-beat-estimates-revenues-miss?cid=CS-CNN-HL-317469")

article.download()
article.parse()
text = article.text
#print(text)

article.nlp()
summary = article.summary
#print(article.summary)
print(article.keywords)

doc = nlp(summary)
for token in doc:
    print(token.text, token.pos, token.dep_)