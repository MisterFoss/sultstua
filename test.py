#python dose not ahave inherrant array so they need to be imported
import array as arr

# "i" indicates that the elements in the array are intigers
my_arr = arr.array("i",[1,2,3])



class HashTable:
    def __init__(self):
        self.capacity = INITIAL_CAPACITY
        self.size = 0
        self.buckets = [None] * self.capacity

    def remove(self, key):
        # 1. Compute hash

        index = self.hash(key)
        node = self.buckets[index]
        prev = None
        # 2. Iterate to the requested node

        while node is not None and node.key != key:
            prev = node
            node = node.next
        # Now, node is either the requested node or none

        if node is None:
            # 3. Key not found

            return None
        else:
            # 4. The key was found.

            self.size -= 1
            result = node.value
            # Delete this element in linked list

            if prev is None:
                node = None
            else:
                prev.next = prev.next.next
            # Return the deleted language

            return result

    def find(self, key):
        # 1. Compute hash

        index = self.hash(key)
        # 2. Go to first node in list at bucket

        node = self.buckets[index]
        # 3. Traverse the linked list at this node

        while node is not None and node.key != key:
            node = node.next
        # 4. Now, node is the requested key/value pair or None

        if node is None:
            # Not found

            return None
        else:
            # Found - return the data value

            return node.value

    def insert(self, key, value):
        # 1. Increment size

        self.size += 1
        # 2. Compute index of key

        index = self.hash(key)
        # Go to the node corresponding to the hash

        node = self.buckets[index]
        # 3. If bucket is empty:

        if node is None:
            # Create node, add it, return

            self.buckets[index] = Node(key, value)
            return
        # 4. Collision! Iterate to the end of the linked list at provided index

        prev = node
        while node is not None:
            prev = node
            node = node.next
        # Add a new node at the end of the list with provided key/value

        prev.next = Node(key, value)

    def hash(self, key):
        hashsum = 0
        # For each character in the key

        for idx, c in enumerate(key):
            # Add (index + length of key) ^ (current char code)

            hashsum += (idx + len(key)) ** ord(c)
            # Perform modulus to keep hashsum in range [0, self.capacity - 1]

            hashsum = hashsum % self.capacity
        return hashsum