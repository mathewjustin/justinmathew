---
title: "The upload is at 49%. The internet drops."
description: "A study session on a system design interview question: how do you resume a 5 GB upload without starting from zero? I think it through on a whiteboard first, then research it with AI and question the answers."
date: 2026-11-15
episode: 2
topic: "System design"
pillar: learn
status: "Study session"
video: "videos/resumable-upload-study.mp4"
poster: "videos/resumable-upload-study.jpg"
duration: "about 8 minutes"
videoNote: "Edited down from a 28-minute session. Recorded on a headset mic, so the audio is rough. The final 90-second design is still to come."
takeaway: "Don’t resume from where the client thinks it is. Resume from what the server can prove it has."
practice:
  question: "A user is 49% into a 5 GB upload and the internet drops. How do we resume without starting from zero?"
  prediction: "Before searching: the 49% might only be what the client sent, not what the server received. So there has to be a checkpoint, but on which side?"
  experiment: "Research it with AI: chunked uploads, S3 multipart versus the tus protocol, and which one wins on fast and flaky networks. Push back where the answers sound too neat."
  explanation: "Split the file into chunks and let the server record what it has stored. On reconnect, the client asks the server and sends only what’s missing. S3 multipart resumes per part and uploads in parallel. tus resumes from the exact byte. It’s a trade-off, not a winner."
audiences:
  - who: "A junior engineer"
    says: "Cut the file into pieces, and ask the server which pieces it already has before sending more."
  - who: "A product manager"
    says: "A dropped connection costs users seconds, not the whole upload."
  - who: "A CTO"
    says: "Uploads go straight to object storage through signed URLs, so 5 GB files never load our servers, and unfinished uploads clean themselves up."
---
