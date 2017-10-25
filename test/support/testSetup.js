import sinon from 'sinon';
import chai, {expect} from 'chai';
import sinonChai from 'sinon-chai';

chai.use(sinonChai);

const should = chai.should();

global.sinon = sinon;
global.chai = chai;
global.should = should;
global.expect = expect;
