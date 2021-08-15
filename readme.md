# Shared List

A simple [Jinaga](https://jinaga.com) example application.

## Build and Run

This application requires [Node](https://nodejs.org/).
Build and run the application using these commands.

```bash
npm ci
npm run build
npm start
```

Then navigate to [http://localhost:8080](http://localhost:8080).

To automatically rebuild during development:

```bash
npm run dev
```

## Walkthrough

This application demonstrates some key points in Jinaga.
It shows how you store data using `j.fact`, how you retrieve data using specifications, how you bind to properties using projections, and how to subscribe to changes made by other users.

### Data Storage

To store data, call `j.fact` and pass in a JSON object.
This object will be stored in the database on the server.

For example, there's some commented out code in [main.tsx](./src/client/main.tsx).
Uncomment this code to see it add an item to a list.

```javascript
const list = await j.fact({
    type: "SharedList.List",
    topic: "villains"
});

const item = await j.fact({
    type: "SharedList.Item",
    list,
    description: "Tribbles",
    created: new Date()
});

display(item);
```

The item knows the list that it belongs to.
But really both are just simple JSON objects, which you can see because of the call to `display`.

```json
{
  "type": "SharedList.Item",
  "list": {
    "type": "SharedList.List",
    "topic": "villians"
  },
  "description": "Tribbles",
  "created": "2021-08-15T00:40:04.142Z"
}
```

When the user submits the form to add an item, the app just calls `j.fact`.
You can see that in [list-container.tsx](./src/client/list/list-container.tsx).

```typescript
await j.fact(new Item(list, description, new Date()));
```

### Retrieval

To retrieve data, you write a specification function.
The function describes the shape of the data you want to retrieve.

For example, there's a simple specification function for items in a list in [main.tsx](./src/client/main.tsx).

```javascript
function itemsInList(list) {
    return j.match({
        type: "SharedList.Item",
        list
    });
}
```

The function matches objects with type `SharedList.Item` related to the given list.
It can be used to retrieve all of the items in the list of villians.
Uncomment the query in main.tsx to see that work.

```javascript
const items = await j.query(list, j.for(itemsInList));
display(items);
```

### Binding

Querying for data is cool, but it only gives you a snapshot of the results.
What you really want are live results that change whenever new items are added.
Then you want to bind those results to a user interface.

Take a look at [list-container.tsx](./src/client/list/list-container.tsx).
It has a projection that turns query results into props.

```typescript
const listProjection = projectionFor(List, {
    list: field(l => l),
    topic: field(l => l.topic),
    Items: collection(j.for(Item.inList), itemComponent, ascending(i => i.created)),
});
```

This projection takes a list and then give you back three props: `list`, `topic`, and `Items`.
The `list` prop is just the list itself.
The `topic` prop is the topic name, like `"villians"`.
And the `Items` prop is a collection of child components, one for each object matching the `Items.inList` specification function.

This projection is mapped to the props of a component:

```typescript
ListContainer = jinagaContainer(j, mapProps(listProjection).to(
    ({list, topic, Items}) => {
    }
));
```

When a new item is added to the list, then the Items collection renders the new item.

### Collaboration

Jinaga is all about helping people work together.
If there is another user on the app, you want to see the things that they add to the list.

You can see this in [list-page.tsx](./src/client/list/list-page.tsx).
It sets up a couple of subscriptions.

```typescript
React.useEffect(() => {
    const list = new List(decodeURI(topic));

    const itemSubscription = j.subscribe(list, j.for(Item.inList));
    const completedSubscription = j.subscribe(list, j.for(Item.inCompletedList).then(Completed.forItem));
    return () => {
        itemSubscription.stop();
        completedSubscription.stop();
    }
}, [topic]);
```

Just call `j.subscribe` to set up a real-time notification whenever somebody else changes the results of a query.
When you are done, call `stop` to stop receiving notifications.

### Offline

It's great to work together.
But sometimes you need to work alone.
Jinaga can help you out there too, by storing data offline.

Go into [jinaga-config.ts](./src/client/jinaga-config.tsx).
Add a line to the configuration so that it looks like this:

```typescript
export const j = JinagaBrowser.create({
    httpEndpoint: "/jinaga",
    indexedDb: "sharedlist"
});
```

Now Jinaga will store all of the data in Indexed DB within the browser.
You can see the database in the Application tab of your browser's developer tools.

Combine this with a PWA and you have a completely stand-alone application.
But even without that, you have an app that is really fast and reliable.
It doesn't have to wait for the data to download each time.
And if there is a problem uploading data from the user, it will be cached and retried.

## Your Turn

That's a quick walkthrough of the app and what you can do with Jinaga.
Now see if you can build the next cool feature.

For example, the specification function for the items in the list only shows those that have not been completed.
Once they are completed, they no longer appear in the list.
Try changing that so that you can see all of the items.
Or show a separate list of just the completed items.

When an item is completed, it's done.
There's no getting it back.
But how about marking an item as not completed anymore?
What would you need to do when the user unchecks an item in the completed list?
How would you need to change the specification function?
Will it pop back into the uncompleted list?
And can you mark it completed again?

Hit me up on Twitter at [@michaellperry](https://twitter.com/michaellperry).
Let me know what you discover.
What would you like to build?