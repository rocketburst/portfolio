---
title: 'Visualizing a Linked List and its Operations'
description: 'Learn the ins and outs of linked lists, including the different types and various operations.'
publishDate: '21 June 2024'
tags: ['data-structures', 'python', 'tutorial']
draft: true
---

When learning data structures and algorithms, one of the first data structures developers encounter is the linked list. There are thousands of tutorials on implementing singly and doubly linked lists in various programming languages, but understanding the logistics behind the implementation is also crucial.

In this article, we will explore linked lists conceptually and visualize both singly and doubly linked lists along with all their operations. This includes creating a node, deleting a node, finding a node by index or data, and more.

In addition to this, we will also discuss the time complexity of each operation as well as quickly discuss an implementation of each operation in Python (as I said before, there are many tutorials for implementations, and there is ChatGPT too!)

Let's get straight into it 🚀

## Introduction to Linked Lists

Before we talk about a linked list, let's talk about what a node is first.

A **node** is an object that holds some data and a pointer to another node, which also contains some data and a pointer to another node, and so on and so forth. A **linked list** is a sequence of those nodes, and the last node always points to `null`.

Here is a representation of a linked list with 3 nodes, with the arrows being the each node's pointers:

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1718301840346/7499f893-913d-4ed6-aefe-ba48ca60264c.png align="left")

The **head** of the linked list is the first node of the list, and a reference of this node is always stored, and the **tail** of the linked list is the last node of the linked list.

### Types of Linked Lists

There are two primary types of linked lists: **singly** and **doubly** linked lists. Nodes in a singly linked list only hold a reference to the next node, while nodes in a doubly linked list hold references to the next and previous node.

The diagram shown above is a singly linked list because the nodes' pointers only point to the next node. Here is a picture of a doubly linked list:

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1718302501581/e9afd506-3d72-438c-95c3-0a1a8c54ecb5.png align="center")

Here, the blue arrows represent each node's next pointer, and the green arrows represent each node's previous pointer. Notice that for doubly linked lists, the head node's previous pointer and the tail's next pointer both point to `null`.

Here are the pros and cons of singly and doubly linked lists summarized in a table:

|                        | Pros                                            | Cons                                      |
| ---------------------- | ----------------------------------------------- | ----------------------------------------- |
| **Singly Linked List** | Uses less memory and has simpler implementation | Can't access later elements easily        |
| **Doubly Linked List** | Can be easily traversed backwards               | Takes twice the amount of memory to store |

### Use Cases for Linked Lists

There are many use cases for linked lists, but I'll just list some of them below:

- Linked Lists are often used to implement other data structures like queues and stacks
- Linked Lists easily represent real objects like trains.
- Linked Lists are often used in hash table chaining
- Linked Lists are used to implement adjacency lists for graphs.

Now that we have a basic idea of what linked lists are, let's go in depth into singly linked lists!

## Singly Linked Lists

Before we visualize singly linked lists, let's quickly discuss what the node for a singly linked list would look like and how to initialize a singly linked list.

Because we are looking at a singly linked list, the node will only contain its data and a pointer to the next node, so it would look like the following Python class:

```python
class SLLNode:
    def __init__(self, data=None, next=None):
        self.data = data
        self.next = next
```

Now to initialize the singly linked list, we can use the following Python class:

```python
class SinglyLinkedList:
    def __init__(self, size=0):
        self.head = None
        self.size = size
```

Now we will visualize the many different operations we can do on a singly linked list, beginning with insertion operations. We will use the following list as an example:

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1718330198800/9194a26b-3ed9-4ace-8d9d-e1d6eb4a27d4.png align="center")

> Note that I did not include the tail node pointing to null. In all subsequent diagrams, I will also be omitting it for clarity.

### Insertion Operations

For inserting some data into our linked list, there are 3 specific cases: inserting at the very beginning of the list (creating a new head node), inserting at the very end of the list (creating a new tail node), and inserting in the middle of the list.

#### Inserting at the Beginning

For our first scenario, let's say we want to insert the number 28 at the beginning of the linked list. To do this, we will create a new node with the data as 28 and the next pointer being the head of the linked list, 56:

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1718330897976/2814202c-cdd5-409e-9678-dccd9c192e76.png align="center")

> The green from here on will represent new additions to the diagram

Because 28 appears to be the new head of the linked list, we would have to internally record that in the linked list class and also increase the size of the linked list. Now we have successfully inserted 28 at the beginning of the list!

Here is a Python implementation of this operation using the `SinglyLinkedList` class from above:

```python
class SinglyLinkedList:
    # ...
    def insert_at_beginning(self, data):
        node = SLLNode(data, self.head)  # Create new node
        self.head = node  # Make that new node the head

        # increase size after addition
        self.size += 1
```

The time complexity for this operation is O(1), which is constant time due to the fact that this operation does not depend on the size of the linked list (evident by the fact that we didn't have to traverse the list in any way).

#### Inserting at the End

For the second scenario, let's say we want to insert 28 to the end of the linked list. To do this, we first need to traverse the linked list and get to the tail of the linked list.

To traverse the linked list, we will create a new pointer called `traversal` that points the head of the linked list.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1718332073701/999596ab-8acb-4e54-9715-152953a9206a.png align="center")

Then, we loop through the linked list as long as the node `traversal` points to has a next pointer. Once the loop has finished, `traversal` will point to the tail of the linked list.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1718332099330/c3ab043a-5beb-47c8-a231-38ce3162c793.png align="center")

Now that we are at the tail of the linked list, we can set the tail node's next pointer to a new node with data of 28 and next pointer of null, making this new node the tail node.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1718332253169/3e739df6-401e-4a36-a987-57f00f3bc232.png align="center")

Now that 28 has been inserted at the end of the linked list, we would internally increase the size of the linked list, and, depending on the programming language, get rid of the traversal pointer.

Here is an implementation of this operation in Python using the same class:

```python
class SinglyLinkedList:
    # ...
    def insert_at_end(self, data):
        if self.head is None:
            self.head = SLLNode(data, None)
            return

        current = self.head  # start at head of the linked list
        while current.next:  # go through the linked list until you get to last value whose next pointer is None
            current = current.next

        # the last node will now point to a new node, making the new node the last node
        current.next = SLLNode(data, None)

        # increase size after addition
        self.size += 1
```

The time complexity for this operation is O(n), which is linear time. This is because we have to traverse the list in order to get to the tail node, and the worst case scenario is a massive linked list. We will see later how the doubly linked list has much better performance with this operation.

#### Inserting in the Middle

For the third and final scenario for inserting an element, let's say we want to insert 28 at index 3. To do this, we need to traverse the linked list and get to 21, the element prior to the place of insertion.

We will use the `traversal` pointer technique and loop through the linked list as long as the `traversal` pointer exists. As we traverse the linked list, we will also internally track a `count` variable and increment it for every loop that occurs.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1718473815322/93db9ba4-7284-4585-a20f-528a7f03ef1c.png align="center")

Inside of the loop, there will be a condition where if the `count` variable is `index - 1`, meaning that we have reached the element prior to the place of insertion, we will actually do the insertion operation.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1718474041478/8409ed49-d517-4038-aa04-17e1aac3b792.png align="center")

Now that we have reached 21, we can now insert 28 by first initializing 28 as a new node with a next pointer of 74.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1718474179991/6a1f1ddd-69b1-448a-a9aa-49dc210c73f5.png align="center")

After this, we can make the 21 node's next pointer 28.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1718474215553/e7161b73-0a8e-4ff6-b933-4016bf5b98f6.png align="center")

Now if we straighten out the linked list, internally increase the size of the list, and get rid of the traversal, we have successfully inserted 28 at index 3 of our linked list!

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1718474328839/1bcdea97-ebaf-4912-bf76-7f5df3cba27d.png align="center")

Here is the code to implement this in Python using the same class:

```python
class SinglyLinkedList:
    # ...
    def insert_at(self, index, data):
        if index < 0 or index > self.size:
            raise IndexError("Invalid index")

        if index == 0:
            self.insert_at_beginning(data)
            return

        count = 0
        current = self.head

        while current:
            if count == index - 1:  # reached element prior to place where new element should be inserted
                node = SLLNode(data, current.next)
                current.next = node  # previous element's next should point to the new element

            current = current.next
            count += 1

        self.size += 1
```

The time complexity for this operation is O(n), which is linear time. This is because we have to traverse the entire linked list, and the worst case scenario is inserting at the end of the linked list (leading to traversing a potentially massive linked list).

Now that we have gone over all of the insertion operations for a singly linked list, let's go on to searching!

### Searching Operation

Searching for an element is pretty simple now that we know how to traverse the linked list using a `traversal` pointer.

For example, let's say we want to find the index of 92 in the original linked list. To do this, we will again create a `traversal` pointer set originally to the head of the linked list and also keep track of a `count` variable.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1718475251101/e64aabf3-08e8-4ff6-8320-c5503b5174c3.png align="center")

Then we will loop through the linked list as long as the `traversal` pointer exists, incrementing the `count` for each loop. During each loop, we will check if the data passed to our function matches the data of the node the `traversal` pointer is pointing to. If this is true, we will return the `count` variable.

In our scenario, that condition will become true when the `traversal` pointer is at 92 and the `count` variable is 4.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1718475491208/f3ec026e-a602-44c6-a10e-e83959ca7add.png align="center")

If we have traversed the entire linked list and the condition was never true, then we would return -1, signaling that the data passed in was never in the linked list.

The Python implementation for this method is as follows:

```python
class SinglyLinkedList:
    # ...
    def index_of(self, data):
        count = 0
        current = self.head

        while current:
            if current.data is data:
                return count

            count += 1
            current = current.next

        return -1
```

The time complexity for this operation is linear, O(n), for the same reason as most insertion operations: we have to traverse the linked list. In the worst-case scenario, the data is not in the linked list, so we would need to traverse the entire list.

As there is only one type of searching operation, we will now move on to the final operation for singly linked lists: removal operations!

### Removal Operations

With removing elements from a singly linked list, there are 2 scenarios: removing at the beginning of the linked list and removing in the middle of the list (the implementation of removing from the middle is the exact same as removing at the end, so I am merging them).

#### Removing from the Beginning

For this first scenario, let's say we want to remove the current head of the linked list, 56. To do this, all we need to do is set the head of the linked list to the previous head's (referring to 56) next pointer.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1718672684009/5b2c0fff-0da1-47dd-8d6b-87f43561fd1a.png align="center")

Doing this operation essentially isolates the 56 node, and Python will automatically destroy the memory for the 56 node (although in other object oriented languages the garbage collection must be done explicitly). We would also internally decrement the size of the list.

With that, 56 is gone and the new head of the linked list is 33! Here is the Python implementation for this method:

```python
class SinglyLinkedList:
    # ...
    def remove_first(self):
        if self.size == 0:
            raise Exception("Linked List is empty")

        self.head = self.head.next  # just make the head what the head was pointing to
        self.size -= 1

        return  # python does garbage collection for data associated with head under the hood
```

The time complexity of this operation is O(n), which is linear time. This is because we aren't traversing the linked list and are only accessing the head of the linked list.

Now we will move on to the final operation for singly linked list, removing from the middle (and end) of the list!

#### Removing from the Middle

For this scenario, let's say we want to remove 92 from the linked list. To do this, we need to traverse the linked list with a `traversal` pointer starting at the list's head.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1718673608049/acce74fc-7970-47f9-b358-ab200813e974.png align="center")

Then we will move through the linked list as long as the node `traversal` is pointing to has a next pointer. If the data of the `traversal` node's next pointer is the data we want to remove, then we will begin the remove operation. In our case, that will be when the `traversal` pointer is pointing to 74.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1718674030141/eccde740-292e-4388-b328-d461efc73c92.png align="center")

The removal operation will set the traversal node's next pointer to the next pointer of the traversal node's next pointer. All the nexts might be driving you nuts, but let's apply this to our scenario; here, we are going to set 74's (the traversal pointer) next pointer to 92's (the traversal's next pointer) next pointer, which is 10.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1718674200917/1e7d1e3a-d782-4502-bbdd-2b7bb4eab382.png align="center")

The removal operation essentially bypasses 92, and 74 goes directly to 10. Because of the direct bypass, 92 will automatically be deleted when this operation happens (because Python has built in garbage collection).

Because of the auto-deletion, 92 is gone from the list, never to be seen again...

There are two ways to implement this operation in Python: one where we are given the data to remove and one where we are given the index of data we want to remove. They are both extremely similar, and the only difference is how the linked list is traversed in each implementation.

Here are both types of the implementation:

```python
class SinglyLinkedList:
    # ...
    def remove_at(self, index):
        if index < 0 or index > self.size:
            raise IndexError("Invalid index")

        if index == 0:  # special case: trying to remove head of the linked list
            self.remove_first()

        count = 0
        current = self.head
        while current:
            if count == index - 1:  # reached element prior to the one desired to be removed
                # prior element's next will point to the element after the one that is being removed
                current.next = current.next.next
                break

            current = current.next
            count += 1

        self.size -= 1

    def remove_value(self, data):
        if self.head is None or self.size == 0:
            return

        if self.head.data is data:
            self.head = self.head.next
            self.size -= 1
            return

        current = self.head
        while current.next:
            if current.next.data == data:
                current.next = current.next.next
                break

            current = current.next

        self.size -= 1
```

The time complexity for this operation is once again O(n), which is linear time, primarily because we had to traverse the linked list.

This concludes all the operations we can perform on a singly linked list. Now, we will focus on visualizing doubly linked lists and their operations, highlighting how they differ from singly linked list operations.
