---
date: '2025-05-11T23:04:00+05:30'
draft: true
title: ' Spiff - A nice templating lib'
---

## What is Spiff?

If we go by the definition, "spiff is a command line tool and declarative in-domain hybrid YAML templating system."

Refer : https://github.com/mandelsoft/spiff

What it means is essentially if you have a yaml like the below:

```yaml
resource:
  name: bosh deployment
  version: 25
  url: (( "http://resource.location/bosh?version=" version ))
  description: (( "This document describes a " name " located at " url ))
````



 