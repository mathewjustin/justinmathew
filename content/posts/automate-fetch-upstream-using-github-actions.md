---
title: 'Automate fetch upstream using github actions'
date: 2021-08-26T10:22:00.002-07:00
draft: false
url: /2021/08/automate-upstream-update-using-github.html
---

      I like to fork interesting github repositories and experiment with it. Those who do this actively might have faced the problem of upstream sync, where we need to sync our repository with the upstream repository. Imagine you forked a repository contains some articles which are being updated everyday, you will like them to have it synced everyday. I do ;) 

  Github introduced a feature called [fetch upstream](https://docs.github.com/en/github/collaborating-with-pull-requests/working-with-forks/syncing-a-fork) this year to solve this issue. But in this case you need to click on the fetch upstream button by yourself, this article is for the lazy ones who want it to be done automatically. 

  

In this blog we are about to learn how to automate upstream fetch of any repository you cloned. We are using [Github actions](https://github.com/features/actions) to do this. The below is the yaml configuration for my github action

  

Here you can see the cron is set to run at midnight, also as you might have already noticed i have created a simple bat file to be excecuted, you can see it below. Next step is to configure a github action with the yml file we created. Go to Actions tab

  

[![](https://docs.github.com/assets/images/help/repository/actions-tab.png)](https://docs.github.com/assets/images/help/repository/actions-tab.png)

  

Click on **New Workflow-> Skip this and set up workflow yourself.**

Here you can select the yml file you created under your repository. Once you set it it up your fork will automatically sync every night. 

  

You can see this example live on my github repository :  [every-programmer-should-know](https://github.com/mathewjustin/every-programmer-should-know/actions)