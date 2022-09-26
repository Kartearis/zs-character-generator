import { selectFromList } from '@/data/races';

export default class NameGenerator {
  cache = null;

  constructor() {
    this.loadCache();
  }

  loadCache() {
    const storage = window.localStorage;
    const cacheFromStorage = storage.getItem('zs-chargen--name-cache');
    if (cacheFromStorage) this.cache = JSON.parse(cacheFromStorage);
  }

  saveCache() {
    const storage = window.localStorage;
    if (this.cache) storage.setItem('zs-chargen--name-cache', JSON.stringify(this.cache));
  }

  async fetchNames() {
    const categories = ['elf', 'dragon', 'pirate', 'dwarf', 'medieval'].filter(() => Math.random() > 0.5);
    try {
      const results = await Promise.all(categories.map((category) => fetch(`https://api.fungenerators.com/name/generate?category=${category}&limit=100`).then((res) => res.json())));
      this.cache = results.map((res) => res.contents.names).flat();
    } catch (e) {
      console.log(e);
    }
    this.saveCache();
  }

  async getName() {
    if (this.cache === null) await this.fetchNames();
    return this.cache ? selectFromList(this.cache) : '';
  }
}
