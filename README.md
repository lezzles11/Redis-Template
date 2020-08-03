# Redis Example :rocket:

## Purpose :dark_sunglasses:

The purpose of this repository is to be able to understand how to utilize redis in future applications.

### Redis Analogies :open_book:

Redis is essentially a large hashmap, where all data is stored according to key and value.

##### Types of data structures

- Lists
- Sets
- Strings
- Hashes
- Sorted Sets

### User Stories :telescope:

1. Users will be able to look through the various examples and understand how to utilize redis well.

## Sprint :athletic_shoe:

| Done? | Component                                              | Priority | Estimated Time | Actual Time |
| ----- | ------------------------------------------------------ | :------: | :------------: | :---------: |
| x     | This checklist                                         |    H     |    10 mins     |   10 mins   |
| x     | Redis Documentation                                    |    M     |    30 mins     |   10mins    |
| x     | Identify the keys that are needed to represent objects |    M     |    30 mins     |             |
| x     | Handlebars: Add Blog Page                              |    M     |    30 mins     |             |
| x     | Handlebars: Details for each blog                      |    M     |    30 mins     |             |
| x     | Handlebars: Search all blog                            |    M     |    30 mins     |             |
| x     | Handlebars: Layouts                                    |    M     |    30 mins     |             |
| x     | Get Home Page                                          |    M     |    30 mins     |             |
| x     | Search all blogs                                       |    M     |    30 mins     |             |
| x     | Add Blog page                                          |    M     |    30 mins     |             |
| x     | Delete blog page                                       |    M     |    30 mins     |             |
| x     | Make sure everything works                             |    M     |    30 mins     |             |

## Structure of Redis Data (Blog Page)

#### Routes

| Route            |    Where it occurs     |                             METHOD                              | Server explanation                                                             |
| ---------------- | :--------------------: | :-------------------------------------------------------------: | ------------------------------------------------------------------------------ |
| /blog/add        |   addblog.handlebars   |                method="post" action="/blog/add"                 | passes in the id, title and description (and then in the server, pushes it in) |
| /blog/delete/:id |   details.handlebars   | method="POST" action="/blog/delete/{{blog.id}}?\_method=DELETE" | client.del(req.params.id)                                                      |
| /blog/search     | searchblogs.handlebars |               method="post" action="/blog/search"               | get the id, and then find it in the database                                   |

#### Blog Table

- id
- title
- description

#### Code Snippets

- [ ] HMSET -> set fields in the hash, that can be retrieved with HGET

```

```

- [ ] set key and value

```
 // KEY: server:name
 // VALUE: fido
SET server:name "fido"
```

- [ ] get value (based on key)

```
 GET server:name => "fido"
```

- [ ] see if key exists or not

```
 EXISTS server:name => 1
    EXISTS server:blabla => 0
```

- [ ] Delete a key and value

```
SET connections 10
// KEY: connections
// VALUE: 10

DEL connections
```

- [ ] Increment a value (which are called counters )

```
SET connections 10
// KEY: connections
// VALUE: 10

INCR connections
// value: 11

DECR connections
// value: 10

DECRYBY connections 10
// value: 0
```

- [ ] A key should only exist for a certain amount of time

```
SET resource:lock "Redis"
// key: resource:lock
// value: Redis

EXPIRE resource:lock 120
// key: resource:lock to be deleted in 120 seconds
// -2 for the TTL of the key means that the key does not exist (anymore).
// A -1 for the TTL of the key means that it will never expire

TTL resource:lock => 113
// TTL tests how long a key will exist
```

- [ ] Adding new element to the end of the list

```
RPUSH friends "Alice"
// puts new element alice at end of list

LPUSH friends "Sam"
// puts new element at the start of the list
```

- [ ] Getting a range of the list

```
LRANGE friends 0 -1
// -1 means you want up to the end of list
// 1) "Sam", 2) "Alice" 3) "Bob"
LRANGE friends 1 2
// => 1) "Alice", 2) "Bob"
```

- [ ] Remove and get the first element of the list

```
LPOP friends
// "Sam"
RPOP friends
// 3
```

#### What is one thing that I learned from doing this project? :books:

- Looking at examples are key (and then playing around with them after)
- Redis is pretty straightforward and easy to use!

#### Credits :recycle:

[Redis Tutorial](https://try.redis.io/)

#### Contributing :round_pushpin:

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
Not sure how? Learn [Github](https://www.youtube.com/watch?v=3RjQznt-8kE&list=PL4cUxeGkcC9goXbgTDQ0n_4TBzOO0ocPR)
Please make sure to update tests as appropriate.

#### License :memo:

[MIT](https://choosealicense.com/licenses/mit/)
