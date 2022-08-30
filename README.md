# Axios, Retry, and Nock

## Introduction

This project provides an example of an Axios Http client that uses a retry strategy for failed requests due to a system error or a network error.

This project uses `retry-axios` npm package to handle the retry strategy.

This project contains examples of tests that use `nock` npm package to intercept HTTP requests sent by the Axios client.

Packages on NPM:
* [Axios](https://www.npmjs.com/package/axios)
* [Retry Axios](https://www.npmjs.com/package/retry-axios/v/latest)
* [Nock](https://www.npmjs.com/package/nock)

## Considerations on Retry Axios and Nock

`Retry Axios` distinguishes the retry strategy for handling system errors that would be returned by a server from network errors caused by the infrastructure. This is a great and clever way to adopt and refine the retry strategy that best suits your need.

`Nock` is currently the most popular mocking framework for intercepting HTTP requests and emulating interactions with a backend service. Its implementation is superior to alternative mocking framework such as `AxiosMock` and its interface easier to use when instrumenting calls to a backend service.

## Run the tests

```shell
npm install
npm test
```
