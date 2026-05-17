---
date: '2026-05-17T09:00:00+05:30'
draft: false
title: 'A Funny Weekend Experiment: Packaging My Terminal Setup'
description: 'I tried to make my Ubuntu terminal feel closer to my Mac setup, and somehow ended up packaging the whole thing as a Homebrew install.'
---

## How This Started

This started as one of those harmless weekend ideas.

I was looking at my Ubuntu machine and thinking: "Can I make this feel a bit
more like the setup I enjoy on my Mac?"

Not a giant desktop transformation. Not a serious productivity manifesto. Just
small things: a nicer terminal, a smarter prompt, better `cd`, better `ls`, a
few Kubernetes shortcuts, and maybe a terminal that did not look like it was
angry at me.

The first stop was Ghostty. I had used iTerm before, and Ghostty felt like a
nice modern terminal to try. Then came Starship for the prompt. Then zoxide,
fzf, eza, bat, fd, ripgrep, kubectl aliases, k9s, tmux, jq, yq...

And of course, after adding all this manually, the obvious thought appeared:

> This is nice. But am I going to remember how I did all of this next time?

Probably not.

So the weekend experiment became a small installable project.

## The Problem With Personal Dotfiles

I like dotfiles. I also fear dotfiles.

They are powerful, but they are usually very personal. A random dotfiles repo can
contain years of tiny assumptions:

- paths that only exist on one machine
- aliases that shadow normal commands
- shell history decisions
- random functions copied from somewhere
- config files that made sense three laptops ago

That is fine for the owner, but a little scary when you want to reuse the setup
on a fresh machine.

So I wanted something smaller and more explicit:

- install the tools with Homebrew
- apply only the managed config files
- back up existing files first
- provide `doctor`, `backup`, and `uninstall`
- keep the shell config readable
- make it work on Linux and macOS

Nothing magical. Just boring enough to trust.

## What The Setup Includes

The project now sets up a terminal workflow around:

- Ghostty config
- zsh
- Starship prompt
- zoxide
- fzf
- eza
- bat
- fd
- ripgrep
- jq
- yq
- kubectl aliases
- k9s
- tmux

The install flow looks like this:

```sh
brew install mathewjustin/pro-terminal/pro-terminal-setup
pro-terminal-setup install
terminal-intro
```

`terminal-intro` is a tiny guide that explains the commands after installation.
I added it because it is very easy to install ten nice tools and then forget
what five of them do.

## The Kubernetes Bits

Since I use Kubernetes often, I added the small shortcuts I actually reach for:

```sh
k get pods
kg deployments
kd pod my-pod
kl my-pod
kns default
k9
k9a
```

The `kns` helper sets the namespace on the current Kubernetes context:

```sh
kns default
```

Tiny thing, but it removes a lot of repetitive typing.

## The Safety Bits

The part I cared about most was not the prompt theme. It was reversibility.

The installer backs up managed files before replacing them. It also has:

```sh
pro-terminal-setup doctor
pro-terminal-setup backup
pro-terminal-setup uninstall
```

I also added a Docker smoke test so the Homebrew install path can be tested in a
clean-ish environment.

This is still a personal setup, but I wanted it to behave less like a mysterious
dotfiles dump and more like a small tool.

## What I Learned

This was a funny reminder that tooling does not have to start as a product idea.
Sometimes it starts with:

> My terminal is too white and I do not like it.

Then you fix one thing. Then another. Then you package it because future-you is
not as reliable as present-you thinks.

Also, Homebrew taps are surprisingly nice for this kind of thing. Once the tap
is set up, installing a personal developer workflow becomes very simple.

## The Repo

The project is here:

https://github.com/mathewjustin/pro-terminal-setup

It is not meant to be the perfect terminal setup for everyone. It is just a
small, portable, Kubernetes-friendly terminal setup that I can install on a
fresh machine without re-learning my own weekend decisions.

And honestly, that is already a win.

