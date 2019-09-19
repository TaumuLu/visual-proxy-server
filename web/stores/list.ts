import { observable, action } from 'mobx';
import axios from 'axios';

export default class List {
  @observable loading = true;
  @observable hotList = [];
  @observable newestList = [];
  @observable total = 0;

  @action async getList(song) {
    this.loading = true;
    const response = await axios.get(`/api/test/${song.id}`);
    this.loading = false;
}

}
