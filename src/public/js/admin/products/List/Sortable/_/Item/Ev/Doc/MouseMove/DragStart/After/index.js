import DragStart from '../index.js';

export default class After extends DragStart {
  handle = (e) => {
    console.log('there!');
  };
}
