import jss, { CreateStyleSheetOptions, Styles, StyleSheet } from 'jss';
import preset from 'jss-preset-default';

jss.setup(preset());

export default function(stylesWithClasses: Partial<Styles<string>>, options?: CreateStyleSheetOptions<string>) : StyleSheet<string> {

  const stylesheet = jss.createStyleSheet(stylesWithClasses).attach();
  return stylesheet;
}