---
date: '2025-06-05T23:02:39+05:30'
draft: true
title: 'Designing a Stock Ticker Service'
description: 'I got pissed off by seeing system design interview videos on this'
---

# The Stock Ticker Service Design

I got pissed off by seeing system design interview videos on this. So I thought why not write a blog post about it. Why i got pissed off? I have watched a video on youtube about this. 

This dude introduces a time series database infront of a stock ticker service. I mean come on, this is not a time series database, this is a stock ticker service.
That is when i stopped watching this video. 

When you design any system we need to understand the requirements first. So lets start with the requirements of a stock ticker service.

# Functional Requirements
- **Real-time Stock Price Updates**: The system should provide real-time updates of stock prices as they change. Don't put too much drama we just need to get the stock price as fast as possible. Nothing more, nothing less.

# Non Functional Requirements

- **High Throughput**

- **Low Latency**

Now first question do we really know what the difference between throughput and latency is? This is the first thing you need to understand before designing any system.

Please check this https://github.com/mathewjustin/DesignPatternsAndAbhyasas/blob/main/LatencyAndThroughput.md

When it comes to stock ticker, i want to get the stock price as fast as possible. If NSE sends a stock price update at 10:00:00.000, i want to get that update at 10:00:00.200. This is the latency requirement. 

Do you even think you can have a db that can give you this kind of latency? No, you can't. Dude put a timeseries db which probably has a latency of 10 ms. You have already failed the requirement.


# Design Choices

Stock brokers like Zerodha, Upstox, and others provide real-time stock price updates through websockets or Server Send Events. So we can use SSE to get real-time stock price updates. Now the next question is how do we store the stock prices?

Assume our server gets these stock price updats from NSE at a rate of 1000 updates per second. We can use a simple in-memory data structure to store the stock prices.



 