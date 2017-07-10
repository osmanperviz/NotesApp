import { compose } from 'compose-middleware'
import logger from 'morgan';
import bodyParser from 'body-parser'

export default function() {
  return compose([
    bodyParser.json(),
    bodyParser.urlencoded({ extended: false }),
  ])
}
