# Microservice Utility Library <sup><sub>(amazing name)</sup></sub>

## Description

This is a utility library with the intention of making microservices easier to create. I'm aiming to make this framework agnostic so you can use express or just regular node however I will be primarily using it with express.

## Classes & Factories

- **BaseController** - This is what I use for creating controllers in my microservices. Controllers is what actually handles the request. Any class extending this will be required to have a method called "methods" which retuns an array of IMethod objects. These contain a type key (one of the MethodTypes enums), an action which is a string describing what the controller method does and a handler (this is an async function that has a payload, EachMessagePayload, and a topic which is just a string). This is essentially what handles the request. When creating an instance of your extended BaseController you have to also pass in a service name, which is just a string describing what that whole controller does. There is also a public method that gets all the kafka topics for that controller instance, the topic name is generated using the MethodType serviceName action seperated by fullstops. This class doesn't need a factory as it isn't being created directly.

- **KafkaClient & KafkaAdminClient** - These two classes are essentially the interface to kafka using kafkajs. I wanted to seperate the admin side from the client side as I only need a few (one to be honest) admin kafka microservices. When using these in my projects I use the KafkaClientFactory (just a class with static methods returning an instance of the client) to create singletons that I can use throughout the project. The regular KafkaClient takes in the following parameters clientId, brokers, groupId. If you wish to know what exactly these do check the kafkajs documentation. The regular KafkaClient has two methods, one is for producing messages and the other is for listening to messages. The admin KafkaClient extends the regular KafkaClient however this also has two additional methods that return all the topics and creates a topic. 

- **Microservice** - This class is going to be the standard class used to run a microservice. Currently this is only going to work with the kafka client but eventually I want to support different methods of communication. Right now this only has one method that runs the microservice. This is still in progress but the aim is when the microservice runs it will get all the topics from the controllers passed in so it can be sent to an admin microservice and create topics where they don't exist. Once this is done topics can be fully automated.

## Utilities

- **Message Conversions** - This library also exposes two functions called jsonToBuffer & bufferToJson. The reason I have these functions is because kafka can either take a message value as a string or a buffer. I decided it would be better to use buffers as you can't just see what the value is if anyone is listening to a topic (unless they convert lol) and just feels nicer than dealing with strings. Soon I want to make a proper encrypted version of these functions.