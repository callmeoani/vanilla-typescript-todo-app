import ListItem from "./ListItem";

interface List {
  list: ListItem[];
  load(): void;
  save(): void;
  clearList(): void;
  addItem(item: ListItem): void;
  removeItem(id: string): void;
}

export default class FullList implements List {
  static instance: FullList = new FullList();
  private constructor(private _list: ListItem[] = []) {}

  get list(): ListItem[] {
    return this._list;
  }

  load(): void {
    //get saved list from storage
    const savedList: string | null = localStorage.getItem("myList");
    //parse gotten list (after checking if it's alright)
    if (typeof savedList !== "string") return;
    const parsedList: { _id: string; _item: string; _checked: boolean }[] =
      JSON.parse(savedList);
    //add the parsed list into the FullList class created
    parsedList.forEach((itemObj) => {
      const newListItem = new ListItem(
        itemObj._id,
        itemObj._item,
        itemObj._checked
      );
      FullList.instance.addItem(newListItem);
    });
  }

  save(): void {
    //save to local storage
    localStorage.setItem("myList", JSON.stringify(this._list));
  }

  addItem(itemObj: ListItem): void {
    //add a single item to the existing list
    this._list.push(itemObj);
    this.save();
  }

  removeItem(id: string): void {
    //remove the passed id from the list of existing items
    this._list = this._list.filter((item) => item.id !== id);
    this.save();
  }

  clearList(): void {
    this._list = [];
    this.save();
  }
}
