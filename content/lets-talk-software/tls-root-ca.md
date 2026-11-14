---
title: "Why would your browser trust my root CA?"
description: "Anyone can create a root certificate authority. Creating one and getting a client to trust it are different things."
date: 2026-10-18
episode: 1
topic: "TLS"
pillar: explain
status: "Work in progress"
video: "videos/tls-first-cut.mp4"
poster: "videos/tls-first-cut.jpg"
duration: "about 90 seconds"
videoNote: "First cut. My narration, diagrams, and a replay of real OpenSSL output. Captions and a checked transcript will come with the finished episode."
takeaway: "A self-signature doesn’t establish trust. The client’s configured trust anchor does."
practice:
  question: "If anyone can create a root CA, why doesn’t my browser trust mine?"
  prediction: "A certificate signed by a root should be accepted. A root is a root."
  experiment: "Create a root CA with OpenSSL, issue a server certificate from it, and connect with a client that hasn’t been told about the CA. Then add the CA to the client’s trust store and connect again."
  explanation: "The first connection fails and the second succeeds. Nothing about the certificates changed. Only the client’s list of trusted roots did."
audiences:
  - who: "A junior engineer"
    says: "Signing a certificate yourself is easy. Trust only happens when the client already has your root in its list of anchors."
  - who: "A product manager"
    says: "Our internal certificates work on company laptops because IT installed our root there. Customer devices don’t have it, so we need a public CA for anything customers see."
  - who: "A CTO"
    says: "Whoever controls the trust store controls who can impersonate our services. Managing internal roots is a security decision, not just setup."
---
