
type Book = { title: string, author: string };

// Generic Array
let books: Book[];
let books2: Array<Book>;
let books3 = new Array<Book>(5);

// Functions
function logAndReturn<T>(thing: T): T {
    console.log(thing);
    return thing;
}

let someString = logAndReturn<string>("Hello, world!");

// Generic interfaces
interface Inventory<T> {
    getNewestItem: () => T | undefined;
    addItem: (item: T) => void;
    getAllItems: () => Array<T>;
}

let bookInventory: Inventory<Book>;

// Generic classes
class Catalog<T> implements Inventory<T> {
    private readonly catalogItems = new Array<T>();

    addItem(item: T): void {
        this.catalogItems.push(item);
    }

    getNewestItem(): T | undefined {
        return this.catalogItems.at(-1);
    }

    getAllItems(): T[] {
        return this.catalogItems;
    }
}

let bookCatalog = new Catalog<Book>();
bookCatalog.addItem({ title: "The Hobbit", author: "" });

// Generic constraints
interface CatalogItem {
    catalogNumber: number;
}

type Book2 = CatalogItem & { title: string, author: string };

class Catalog2<T extends CatalogItem> implements Inventory<T> {
    private readonly catalogItems = new Array<T>();

    addItem(item: T): void {
        this.catalogItems.push(item);
    }

    getNewestItem(): T | undefined {
        return this.catalogItems.at(-1);
    }

    getAllItems(): T[] {
        return this.catalogItems;
    }
}

let bookCatalog2 = new Catalog2<Book2>();
bookCatalog2.addItem({ catalogNumber: 123, title: "The Hobbit", author: "" });
