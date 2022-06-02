import { join } from 'path';
import { Journal, PersistanceManager } from '../SOLID/01_SingleResponsibility';
import logger from '../utils/logger.util';

logger.success('Starting save file');
const journal = new Journal();
journal.addEntry('I cried today.');
journal.addEntry('I ate a bug.');
PersistanceManager.save(journal, join(__dirname, 'temp', 'journal.txt'));
logger.success('Single responsibility End');
