---
title: 'Visualizing Linked Lists and Their Operations - A Comprehensive Guide'
description: 'Explore and visualize linked lists: singly and doubly. Understand their operations, implementations, and time complexities with Python examples.'
publishDate: '4 July 2024'
tags: ['python', 'tutorial', 'ds-algs']
---

When learning data structures and algorithms, one of the first data structures developers encounter is the linked list. There are thousands of tutorials on implementing singly and doubly linked lists in various programming languages, but understanding the logistics behind the implementation is also crucial.

In this article, we will explore linked lists conceptually and visualize both singly and doubly linked lists along with all their operations. This includes creating a node, deleting a node, finding a node by index or data, and more.

In addition to this, we will also discuss the time complexity of each operation as well as quickly discuss an implementation of each operation in Python (as I said before, there are many tutorials for implementations, and there is ChatGPT too!)

Let's get straight into it 🚀

## Introduction to Linked Lists

Before we dive into linked lists, let's first understand what a node is.

A **node** is an object that contains data and a pointer to another node, which also contains data and a pointer to yet another node, and so forth. A **linked list** is a sequence of these nodes, with the last node always pointing to `null`.

Here is a representation of a linked list with three nodes, where the arrows represent each node's pointers:

![Linked List](https://cdn.hashnode.com/res/hashnode/image/upload/v1718301840346/7499f893-913d-4ed6-aefe-ba48ca60264c.png)

The **head** of the linked list is the first node of the sequence, and its reference is always stored. The **tail** of the linked list is the last node in the sequence.

### Types of Linked Lists

There are two primary types of linked lists: **singly** and **doubly** linked lists. Nodes in a singly linked list hold a reference only to the next node, whereas nodes in a doubly linked list hold references to both the next and previous nodes.

The diagram above is a singly linked list because the nodes' pointers only point to the next node. Here is a picture of a doubly linked list:

![Doubly Linked List](https://cdn.hashnode.com/res/hashnode/image/upload/v1718302501581/e9afd506-3d72-438c-95c3-0a1a8c54ecb5.png)

In this diagram, the blue arrows represent each node's next pointer, and the green arrows represent each node's previous pointer. Notice that in doubly linked lists, the head node's previous pointer and the tail node's next pointer both point to `null`.

Here is a summary of the pros and cons of singly and doubly linked lists:

|                        | Pros                                         | Cons                                              |
| ---------------------- | -------------------------------------------- | ------------------------------------------------- |
| **Singly Linked List** | Uses less memory and is simpler to implement | Can't easily access previous elements             |
| **Doubly Linked List** | Can be easily traversed backwards            | Requires more memory to store additional pointers |

### Use Cases for Linked Lists

There are many use cases for linked lists, but here are a few notable examples:

- Linked lists are often used to implement other data structures such as queues and stacks.
- Linked lists can represent real-world objects like trains.
- Linked lists are frequently used in hash table chaining.
- Linked lists are used to implement adjacency lists for graphs.

Now that we have a basic understanding of linked lists, let's delve deeper into singly linked lists!

## Singly Linked Lists

Before we visualize singly linked lists, let's quickly discuss what the node for a singly linked list looks like and how to initialize a singly linked list.

In a singly linked list, the node will only contain its data and a pointer to the next node. Here's what the Python class for a singly linked list node would look like:

```python
class SLLNode:
    def __init__(self, data=None, next=None):
        self.data = data
        self.next = next
```

To initialize the singly linked list, we can use the following Python class:

```python
class SinglyLinkedList:
    def __init__(self, size=0):
        self.head = None
        self.size = size
```

Next, we'll visualize the different operations we can perform on a singly linked list, starting with insertion operations. We will use the following list as an example:

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1718330198800/9194a26b-3ed9-4ace-8d9d-e1d6eb4a27d4.png)

> Note: I did not include the tail node pointing to null. For clarity, I will omit it in all subsequent diagrams.

### Insertion Operations

When inserting data into our linked list, there are three specific cases: inserting at the beginning of the list (creating a new head node), inserting at the end of the list (creating a new tail node), and inserting in the middle of the list.

> Note: I won't visualize edge cases, but they will be accounted for in the Python implementation.

#### Inserting at the Beginning

For our first scenario, let's say we want to insert the number 28 at the beginning of the linked list. To do this, we create a new node with the data 28 and the next pointer set to the current head of the linked list, 56:

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1718330897976/2814202c-cdd5-409e-9678-dccd9c192e76.png)

> Green represents new additions to the diagram.

Since 28 is now the new head of the linked list, we need to update the head reference in the linked list class and increase the size of the linked list. We've successfully inserted 28 at the beginning of the list!

Here is a Python implementation of this operation using the `SinglyLinkedList` class from above:

```python
class SinglyLinkedList:
    # ...
    def insert_at_beginning(self, data):
        node = SLLNode(data, self.head)  # Create new node
        self.head = node  # Make the new node the head

        # Increase size after addition
        self.size += 1
```

The time complexity for this operation is O(1), or constant time, since the operation does not depend on the size of the linked list (we didn't have to traverse the list).

#### Inserting at the End

In the second scenario, let's say we want to insert 28 at the end of the linked list. To do this, we first need to traverse the linked list to reach the tail.

To traverse the linked list, we create a new pointer called `traversal` that points to the head of the linked list.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1718332073701/999596ab-8acb-4e54-9715-152953a9206a.png)

We then loop through the linked list as long as the node `traversal` points to has a next pointer. Once the loop finishes, `traversal` will point to the tail of the linked list.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1718332099330/c3ab043a-5beb-47c8-a231-38ce3162c793.png)

Now that we are at the tail of the linked list, we set the tail node's next pointer to a new node with data 28 and a next pointer of null, making this new node the tail.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1718332253169/3e739df6-401e-4a36-a987-57f00f3bc232.png)

Having inserted 28 at the end of the linked list, we increase the size of the linked list. Depending on the programming language, we may also need to dispose of the traversal pointer.

Here is an implementation of this operation in Python using the same class:

```python
class SinglyLinkedList:
    # ...
    def insert_at_end(self, data):
        if self.head is None:
            self.head = SLLNode(data, None)
            return

        current = self.head  # Start at the head of the linked list
        while current.next:  # Traverse the linked list until reaching the last node (whose next pointer is None)
            current = current.next

        # The last node now points to a new node, making the new node the last node
        current.next = SLLNode(data, None)

        # Increase size after addition
        self.size += 1
```

The time complexity for this operation is O(n), or linear time, because we have to traverse the list to reach the tail node. The worst-case scenario is a very long linked list. We will later see how the doubly linked list offers better performance for this operation.

#### Inserting in the Middle

For the third and final scenario, let's say we want to insert 28 at index 3. To do this, we need to traverse the linked list to reach 21, the element prior to the place of insertion.

We use the `traversal` pointer technique and loop through the linked list as long as the `traversal` pointer exists. As we traverse the linked list, we also track a `count` variable, incrementing it with each loop.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1718473815322/93db9ba4-7284-4585-a20f-528a7f03ef1c.png)

Inside the loop, if the `count` variable equals `index - 1` (indicating we've reached the element prior to the insertion point), we perform the insertion operation.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1718474041478/8409ed49-d517-4038-aa04-17e1aac3b792.png)

Now that we've reached 21, we can insert 28 by first initializing it as a new node with a next pointer of 74.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1718474179991/6a1f1ddd-69b1-448a-a9aa-49dc210c73f5.png)

Then, we update the 21 node's next pointer to 28.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1718474215553/e7161b73-0a8e-4ff6-b933-4016bf5b98f6.png)

After straightening out the linked list, increasing its size, and removing the traversal pointer, we've successfully inserted 28 at index 3!

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1718474328839/1bcdea97-ebaf-4912-bf76-7f5df3cba27d.png)

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
            if count == index - 1:  # Reached the element prior to the insertion point
                node = SLLNode(data, current.next)
                current.next = node  # Previous element's next points to the new element

            current = current.next
            count += 1

        self.size += 1
```

The time complexity for this operation is O(n), or linear time, because we have to traverse the linked list. The worst-case scenario is inserting at the end of the list, which involves traversing a potentially long linked list.

Having covered all insertion operations for a singly linked list, let's move on to searching!

### Searching Operation

Searching for an element is straightforward now that we know how to traverse the linked list using a `traversal` pointer.

For example, let's say we want to find the index of 92 in the original linked list. To do this, we create a `traversal` pointer set to the head of the linked list and also keep track of a `count` variable.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1718475251101/e64aabf3-08e8-4ff6-8320-c5503b5174c3.png)

We loop through the linked list as long as the `traversal` pointer exists, incrementing `count` with each loop. During each loop, we check if the data passed to

the function equals the node's data. If so, we return the `count` variable, representing the index.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1718475583721/c9e1e327-e2ea-4d28-b8c4-3dd174c8e9e6.png)

In this case, we see that 92 is at index 2!

If the data is not found in the linked list, we return -1.

Here's the implementation in Python:

```python
class SinglyLinkedList:
    # ...
    def search(self, data):
        current = self.head
        count = 0

        while current:
            if current.data == data:
                return count  # Data found

            current = current.next
            count += 1

        return -1  # Data not found
```

The time complexity for this operation is O(n), or linear time, because we may have to traverse the linked list to find the desired element.

Finally, let's look at deletion operations in a singly linked list!

### Removal Operations

For removal operations, there are three specific cases: removing the first element of the linked list, removing the last element, and removing an element in the middle.

#### Removing the First Element

Removing the first element is straightforward. If we look at the diagram below and assume we want to remove 56, we simply update the head reference to 71, the next element in the linked list.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1718475972450/f624ab6e-4a84-43f4-bc54-7ab7cf7c8949.png)

In this case, the garbage collector will take care of 56.

Here's the implementation of this operation in Python:

```python
class SinglyLinkedList:
    # ...
    def remove_at_beginning(self):
        if self.size == 0:
            raise ValueError("List is empty")

        self.head = self.head.next
        self.size -= 1
```

The time complexity for this operation is O(1), or constant time, since we only update the head reference, independent of the linked list's size.

#### Removing the Last Element

Removing the last element requires a bit more work. We need to traverse the linked list to reach the element before the tail (the second-to-last element).

Using the `traversal` pointer, we loop through the linked list as long as the current node's next node has a next node (i.e., the next node is not the tail).

In this example, we want to remove 92 from the linked list, so we need to reach 31.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1718476169921/ca6cf1f8-e240-4631-b87e-2e1b0d0c4221.png)

When the traversal is complete, we update the second-to-last node's next pointer to null, effectively removing the tail from the linked list.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1718476295560/2045b2df-cb79-463e-9be6-1352b634d464.png)

We then decrease the linked list's size and dispose of the traversal pointer.

Here's the implementation of this operation in Python:

```python
class SinglyLinkedList:
    # ...
    def remove_at_end(self):
        if self.size == 0:
            raise ValueError("List is empty")

        current = self.head
        while current.next.next:  # Traverse to the second-to-last element
            current = current.next

        current.next = None  # Update the second-to-last element's next pointer to null
        self.size -= 1
```

The time complexity for this operation is O(n), or linear time, because we must traverse the linked list to reach the second-to-last element.

#### Removing an Element in the Middle

Removing an element in the middle is similar to the insertion operation. We need to traverse the linked list to reach the element before the one we want to remove.

In this example, let's say we want to remove 71 from the linked list. We first reach 56, the element before 71, using the `traversal` pointer technique.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1718476587847/12312450-68a2-4a6c-9242-c01c0a2544e1.png)

Once we reach 56, we update its next pointer to 21, effectively removing 71 from the linked list.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1718476654937/6a9ac4e6-35de-4b37-87d1-9708db1dff26.png)

We then decrease the linked list's size and dispose of the traversal pointer.

Here's the implementation of this operation in Python:

```python
class SinglyLinkedList:
    # ...
    def remove_at(self, index):
        if index < 0 or index >= self.size:
            raise IndexError("Invalid index")

        if index == 0:
            self.remove_at_beginning()
            return

        count = 0
        current = self.head
        while current:
            if count == index - 1:  # Reached the element before the one to be removed
                current.next = current.next.next  # Update the next pointer to skip the removed element

            current = current.next
            count += 1

        self.size -= 1
```

The time complexity for this operation is O(n), or linear time, because we must traverse the linked list to reach the element before the one to be removed.

That covers the removal operations for singly linked lists! We have now covered the basic operations: insertion, searching, and removal.

Now we will move on to doubly linked lists!

## Doubly Linked Lists

Just like with singly linked lists, we need to define what a node in a doubly linked list looks like. Since this is a doubly linked list, each node must store the data, the next pointer, and the previous pointer.

Here's the Python implementation for the node class:

```python
class DLLNode:
    def __init__(self, data=None, prev=None, next=None):
        self.data = data
        self.prev = prev
        self.next = next
```

For visualization, we'll use the following doubly linked list as an example:

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1719025914995/d12e1721-9a29-4f2a-903f-10782034d7d2.png)

> Just like with the singly linked list diagram, I won't show any nodes pointing towards `null` for the sake of clarity.

Now, let's initialize the doubly linked list with the following Python class:

```python
class DoublyLinkedList:
    def __init__(self, size=0):
        self.size = size
        self.head = None
        self.tail = None
```

> Note that in a doubly linked list, we store references for both the head and the tail of the list because the nodes have both next and previous pointers.

Let's start visualizing with insertion operations!

### Insertion Operations

Just like with singly linked lists, there are three scenarios for inserting an element into a doubly linked list: inserting at the beginning, at the end, and in the middle.

We'll begin with inserting at the beginning.

#### Inserting at the Beginning

Let's say we want to insert 225 at the beginning of the linked list. To perform this operation, we'll make the head node's previous pointer point to a new node with the data 225, a previous pointer of null, and a next pointer pointing to the head node.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1719026264454/2ba10167-31d8-4fc0-b304-aeec372df2f2.png)

Next, we need to internally update the new head of the linked list to be the 225 node (as it has already been updated visually from the diagram). And with that, 225 becomes the new head!

Here is the Python implementation for this method:

```python
class DoublyLinkedList:
    # ...
    def insert_at_beginning(self, data):
        if self.size == 0:
            self.head = self.tail = DLLNode(data, None, None)  # creating new node that is head and tail
        else:
            self.head.prev = DLLNode(data, None, self.head)  # adding previous pointer to head of linked list
            self.head = self.head.prev  # shifting head of linked list to the left one element

        self.size += 1
```

The time complexity for this operation is O(1) - constant time, because we only need to access the head of the list and don't need to traverse the list.

#### Inserting at the End

Now let's imagine we want to insert 225 at the end of the list. Because this is a doubly linked list, we can access the tail node; we can make the tail's next pointer point to a new node with data 225, a previous pointer pointing to the tail node, and a next pointer of null.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1719109483842/7eb9963e-63d3-4241-978e-a0413c7712ee.png)

Just like with inserting at the beginning, we need to internally update the new tail of the linked list to be 225, as it is already depicted visually.

Now that 225 is the tail of the linked list, let's look at the Python implementation for this method:

```python
class DoublyLinkedList:
    # ...
    def insert_at_end(self, data):
        if self.size == 0:
            self.head = self.tail = DLLNode(data, None, None)  # creating new node that is head and tail
        else:
            self.tail.next = DLLNode(data, self.tail, None)
            self.tail = self.tail.next

        self.size += 1
```

While inserting at the end of a singly linked list has a time complexity of O(n), inserting at the end of a doubly linked list has a time complexity of O(1). This is because we have a reference to the tail node, so we don't need to traverse the entire list.

To finish off the insertion operations, let's look at inserting in the middle!

#### Inserting in the Middle

Let's say we want to insert 225 at index 3 of the doubly linked list. Because we have to deal with next and previous pointers for all of the nodes, this explanation will be a bit trickier to follow, but let's get started!

First, we will initialize a `traversal` pointer and a `count` variable for traversing the linked list.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1719111666159/22c8a0fc-6e02-4882-8597-617e1997cc2d.png)

Then, we will traverse the linked list while the traversal pointer exists until we get to the node right before the place of insertion (in our case at 874). We will increment the `count` for every iteration of the loop.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1719112981587/d163e841-8938-40a8-8752-ff89d9c3edaa.png)

Now that we are at the place before insertion, we will initialize a new node with data 225, a previous pointer pointing to the traversal pointer (which is 874), and a next pointer pointing to the traversal pointer's next pointer (which is 333).

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1719113064399/f3f3809a-dead-41dd-b767-37a99a716999.png)

Now we need to set the previous pointer of the traversal pointer's next pointer to be the node we are inserting. We also need the traversal's next pointer to be the node we are inserting.

In our scenario, this means modifying 333's previous pointer to be 225 and 874's next pointer to be 225.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1719115580071/0f450a35-b45b-4f39-86b1-70bf13251b23.png)

Now if we straighten out the list and remove the traversal pointer, we see that 225 has been successfully inserted at index 3!

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1719115729663/1a634316-2b91-439c-ac0f-68915c7f0a9e.png)

Here is the Python implementation for this method:

```python
class DoublyLinkedList:
    # ...
    def insert_at(self, index, data):
        if index < 0 or index > self.size:
            raise IndexError("Invalid index")

        if index == 0:
            self.insert_at_beginning(data)
            return

        if index == self.size:
            self.insert_at_end(data)
            return

        current = self.head
        count = 0

        while current:
            if count == index - 1:
                node = DLLNode(data, current, current.next)
                current.next.prev = node
                current.next = node
            count += 1
            current = current.next

        self.size += 1
```

The time complexity for this operation is linear time, O(n), because we need to traverse the linked list to find the place of insertion.

Now that we have covered all the insertion operations, let's move on to visualizing how to search a doubly linked list.

### Searching Operation

Searching for an element in a doubly linked list is exactly like searching a singly linked list, as we use the same traversal pointer technique.

As such, we can copy the singly linked list Python implementation for the doubly linked list implementation:

```python
class DoublyLinkedList:
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

Because we have a reference to the tail of the linked list, we could also do a backwards traversal to find the index. Let's visualize that before we look at its implementation.

For this scenario, let's say we want to find the index of 928 in the linked list. Because we are doing a backwards traversal, we will create a traversal pointer pointing to the tail of the linked list and a count variable set to the last index of the linked list, 4.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1719166107673/6ca8c999-781a-4fcf-ac00-2ef2442543ad.png)

Now as long as the `traversal` pointer exists, we will iterate through the linked list backwards, decrementing the `count` variable as we loop.

During each loop, we will see if the data of the node `traversal` is pointing to equals the data passed in (in our case 928); if that condition is true, then we would return our count, signifying the index.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1719166141046/8c808978-7baf-4bb2-a7fd-3a1a3c80afa4.png)

In our case, the function would return 1.

Let's now look at the Python implementation for the backwards traversal implementation:

```python
class DoublyLinkedList:
    # ...
    def index_of_backwards(self, data):
        count = self.size - 1
        current = self.tail

        while current:
            if current.data is data:
                return count

            count -= 1
            current = current.prev
```

The time complexity for both the forward and backward traversal version of the search operation is O(n) because regardless of how you search the linked list, you still have to iterate through.

Now we will move on to the final type of operation for doubly linked lists: removal!

### Removal Operation

For the removal operation, we have three scenarios: removing at the beginning, end, and middle of the linked list. We'll go through them in that order.

#### Removing at the Beginning

For this scenario, let's say we want to remove the head of the linked list, which is currently holding the value 103. To perform this operation, we need to set the new head of the linked list to be the previous head's next pointer and set the previous pointer of the new head to `null`.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1719859795140/22846ed5-763d-4c76-a4ba-f4568dc3e862.png)

By doing this operation, we successfully isolate the node with the value 103 (which effectively removes it from the list) and make 928 the new head of the linked list.

Here is the Python implementation for this method:

```python
class DoublyLinkedList:
    # ...
    def remove_first(self):
        if self.size == 0:
            print("List is empty")
            return

        if self.size == 1:
            self.head = self.tail = None
        else:
            self.head = self.head.next
            self.head.prev = None

        self.size -= 1
```

The time complexity for this operation is O(1), because we don't need to traverse the linked list at all.

#### Removing at the End

Now for this scenario, let's say we want to remove the tail of the linked list, which currently holds the value 662. To perform this operation, we need to set the new tail of the linked list to be the previous tail's previous pointer and set the next pointer of the new tail to `null`.

In our scenario, this means that we need to set the new tail of the linked list to be 333 and set the next pointer of 333 to `null`.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1719860288930/1edb5394-9636-45d9-9bb2-c84dc0d90b06.png)

By doing this operation, we successfully isolate the node with the value 662 (which effectively removes it from the list) and make 333 the new tail of the linked list.

Here is the Python implementation for this method:

```python
class DoublyLinkedList:
    # ...
    def remove_last(self):
        if self.size == 0:
            print("List is empty")
            return

        if self.size == 1:
            self.head = self.tail = None
        else:
            self.tail = self.tail.prev
            self.tail.next = None

        self.size -= 1
```

As you can see, the implementation and explanation for this method are quite similar to removing at the beginning of the list. The time complexity for each method remains O(1).

#### Removing in the Middle

For this final scenario, let's say we want to remove the node with the value 874, which is at index 2 in the linked list.

To perform this operation, we need to traverse the linked list using a `traversal` pointer and a `count` variable until we reach the node before the one we want to remove.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1719860779017/7b0facbc-c288-4fae-99d8-08a12b1e2fe9.png)

Now that we are at the position before removal, we need to rearrange the pointers to isolate node 874.

We'll make the `traversal` pointer's next pointer the next pointer of the `traversal`'s next pointer. Then we'll make the previous pointer of the `traversal`'s next pointer the current `traversal`.

Applying this to our scenario, we would make 928's next pointer 333 and then make 333's previous pointer (which is now 928) point back to 928.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1719861120879/3e375419-0b73-4a81-ab33-84cf760bea5d.png)

With this operation, we have isolated node 874, and it will subsequently be deleted by Python's garbage collector, effectively removing it from the linked list.

Here is the Python implementation for this method:

```python
class DoublyLinkedList:
    # ...
    def remove_at(self, index):
        if index < 0 or index >= self.size:
            raise IndexError("Invalid index")

        if index == 0:
            self.remove_first()
            return

        if index == self.size - 1:
            self.remove_last()
            return

        current = self.head
        count = 0

        while current:
            if count == index:
                current.prev.next = current.next
                current.next.prev = current.prev
                break
            count += 1
            current = current.next

        self.size -= 1
```

If we want to remove the node by its value rather than its index, we can use the following method:

```python
class DoublyLinkedList:
    # ...
    def remove_object(self, data):
        index = self.index_of(data)
        if index != -1:
            self.remove_at(index)
```

The time complexity for the removal operation is O(n), because in the worst case, we may need to traverse the entire linked list to find the node to remove.

With these operations—insertion, search, and removal—you have a complete understanding of how to work with doubly linked lists in Python.

## Conclusion

So you've finally reached the end of the article! I hope you now have a strong understanding of linked lists, their types, and their various operations. I now reccomend that you go to LeetCode and start practicing some linked list problems to test your skills!

You can find the code I used for the implementations [here](https://github.com/rocketburst/python-ds-algs/).

Thank you so much for reading the post, and comment down below if you have any questions (or if I made a mistake!)

Signing off 👋
