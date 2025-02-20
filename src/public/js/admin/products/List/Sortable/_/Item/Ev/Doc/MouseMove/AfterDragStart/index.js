import MouseMove from '../index.js';

export default class AfterDragStart extends MouseMove {
  handle(e) {
    console.log('there!');
  }
}
