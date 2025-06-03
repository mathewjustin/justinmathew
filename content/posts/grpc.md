---
date: '2025-06-03T23:02:39+05:30'
draft: false
title: 'gRPC - The Witchcraft of Remote Procedure Calls'
description: 'A deep dive into gRPC, its benefits, and how to implement it in a Spring Boot application.'
---

# WTF is gRPC? Why GRPC ?

   Some technologies are like witchcraft. You hear about them, you see them in action, but you don't really understand how they work. gRPC is one of those technologies for me. It's a remote procedure call (RPC) framework that allows you to define services and methods in a language-agnostic way, and then generate client and server code in multiple languages.

   So what it means is there is a .proto file which is a protocol buffer file that defines the service and its methods. You can then use the `protoc` compiler to generate client and server code in multiple languages, such as Go, Python, Java, C++, etc. This allows you to write your service in one language and then generate client code in another language.

   When it comes to why gRpc the simple answer is performance. gRPC uses HTTP/2 for transport, which allows for multiplexing multiple requests over a single connection, reducing latency and improving throughput. It also uses Protocol Buffers (protobuf) for serialization, which is a more efficient binary format compared to JSON or XML. Essentially no more JSON parsing, wasteful string manipulation, and all that stuff. gRPC is designed to be fast and efficient, making it a great choice for high-performance applications. But equally hard to debug.  

## Step 1: 

Create a .proto file


```protosyntax = "proto3";
syntax = "proto3";
package tutorial;

message Person {
  string name = 1;
  int32 id = 2;
  string email = 3;
}
```


## Step 2: Compile to Java Classes
 
```bash
protoc --java_out=. person.proto
```

Frameworks like Spring boot has native support for gRPC, so you can easily integrate it into your application. You can also use the `grpc-java` library to create a gRPC server and client in Java. 

Essentially for a java developers perspective what you have after this step is a set of Java classes that represent the messages and services defined in the .proto file. You can then use these classes to create a gRPC server and client.

Since we defined the package as `tutorial`, the generated classes will be in the `tutorial` package. You can then use these classes to create a gRPC server and client.

## Step 3: Lets create a simmple gRPC server and client, we use Spring because its myfavorite framework.

## A spring developer thing basically the service class.

```java
@Service
public class ProtobufService {

    public byte[] serializePerson(String name, int id, String email) {
        PersonProto.Person person = PersonProto.Person.newBuilder()
                .setName(name)
                .setId(id)
                .setEmail(email)
                .build();
        return person.toByteArray();
    }

    public PersonProto.Person deserializePerson(byte[] data) throws InvalidProtocolBufferException {
        return PersonProto.Person.parseFrom(data);
    }
}
```

Just focus on the fact that we are serializing and deserializing the `Person` object using the generated classes from the .proto file. The `serializePerson` method creates a `Person` object and converts it to a byte array, while the `deserializePerson` method takes a byte array and converts it back to a `Person` object.

## Now the controller class

```java
@RestController
@RequestMapping("/api/person")
public class PersonController {

    private final ProtobufService protobufService;

    public PersonController(ProtobufService protobufService) {
        this.protobufService = protobufService;
    }

    @GetMapping(value = "/get", produces = "application/x-protobuf")
    public ResponseEntity<byte[]> getPerson() {
        byte[] protobufData = protobufService.serializePerson("Alice", 123, "alice@example.com");
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_TYPE, "application/x-protobuf")
                .body(protobufData);
    }

    @PostMapping(value = "/post", consumes = "application/x-protobuf")
    public ResponseEntity<String> postPerson(@RequestBody byte[] data) throws InvalidProtocolBufferException {
        PersonProto.Person person = protobufService.deserializePerson(data);
        return ResponseEntity.ok("Received: " + person.getName());
    }
}
```

 This is like a REST api but using gRPC. The `getPerson` method returns a `Person` object serialized as a byte array, and the `postPerson` method takes a byte array and deserializes it back to a `Person` object. 
 
 So essentially the object mapper magic which we used to have in Spring Boot is now replaced with the generated classes from the .proto file. This allows us to use gRPC to communicate between services in a more efficient way. No more JSON parsing, no more string manipulation, just pure binary data.


 ## How client will look like
  
  This is a very important thing to understand, behind the screen its binary data. So client should also have access to the generated classes from the .proto file. The client will use these classes to create a gRPC client and call the server methods. Usually the protobuf file is shared between the client and server, so both sides can generate the same classes.

  So lets just go with pure curl.
```bash
curl -X GET http://localhost:8080/api/person/get \
     -H "Accept: application/x-protobuf" \
     --output person_response.bin
```

Now here the output will be a binary file `person_response.bin` which contains the serialized `Person` object. You can then use the generated classes to deserialize this file and get the `Person` object.

So essentially client needs access to the same .proto file to deserialize the data. If you are using a language like Java, you can use the generated classes to deserialize the data like this:

```java
byte[] data = Files.readAllBytes(Paths.get("person_response.bin"));
Person person = Person.parseFrom(data);
System.out.println(person.getName()); // Alice
```

# Caveats
 
- gRPC is not a silver bullet, it has its own set of challenges and complexities. Debugging gRPC can be tricky, especially when dealing with binary data. You need to have the .proto file to understand the structure of the data. 
- gRPC is not suitable for all use cases, especially when you need to support older clients or browsers that do not support HTTP/2. In such cases, you may need to fall back to REST or other protocols.
- gRPC is not a replacement for REST, it is an alternative. You can use gRPC alongside REST in your application, depending on the use case. For example, you can use gRPC for internal communication between services and REST for external APIs. But remember debuging this is a pain in ***. Imagine pulling out kibana logs and trying to figure out what went wrong with a binary data.


