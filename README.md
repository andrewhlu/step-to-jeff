### This page is a work in progress, please check back later!

---

# Step to Jeff

*Every onboarding task brings you one step closer to Jeff Bezos!*

Step to Jeff is an Alexa Skill designed for incoming Amazon interns. This skill serves as an incoming Amazonian's one-stop shop for completing pre-onboarding tasks and learning more about Amazon's company culture.

![Step to Jeff Cover](steptojeff.jpeg)

## Team Members

<div class="flex-container">
    <a href="https://www.linkedin.com/in/andrewhlu/">
        <div class="hole"></div>
        <img src="https://andrewhlu.com/images/hk_prof_square.png">
        <p class="name">Andrew Lu</p>
        <p class="title">SDE Intern, Alexa Email</p>
    </a>
    <a href="https://www.linkedin.com/in/thienkimcao/">
        <div class="hole"></div>
        <img src="https://andrewhlu.com/images/members/thienkimcao.jpeg">
        <p class="name">Thienkim Cao</p>
        <p class="title">UX Design Intern, Fire TV</p>
    </a>
    <a href="https://www.linkedin.com/in/min-jea-seo-164138165/">
        <div class="hole"></div>
        <img src="https://andrewhlu.com/images/members/minjeaseo.jpeg">
        <p class="name">Min Jea Seo</p>
        <p class="title">UX Design Intern, Fire TV</p>
    </a>
    <a href="https://www.linkedin.com/in/daniel-gultom/">
        <div class="hole"></div>
        <img src="https://andrewhlu.com/images/members/danielgultom.jpg">
        <p class="name">Daniel Gultom</p>
        <p class="title">SDE Intern, Selling Partner Analytics</p>
    </a>
    <a href="https://www.linkedin.com/in/elliechoi/">
        <div class="hole"></div>
        <img src="https://andrewhlu.com/images/members/elliechoi.jpeg">
        <p class="name">Ellie Choi</p>
        <p class="title">UX Design Intern, Prime Gaming</p>
    </a>
</div>

## Why Step to Jeff?

From the moment interns are hired and accept their offer letter, interns are consistently wondering what's next, and are eager to learn more about their team and their project. However, many interns, including us, shared similar pain points when stuck in the waiting zone between their hiring date and their first day at work, often asking the same questions:

* What are my onboarding tasks, and how do I do them?
* How do I know whether I have completed my onboarding tasks?
* How do I know a certain Amazon onboarding task / email is legitimate?
* Is there anything I can do / learn *right now* to better prepare myself as an incoming intern?

There are a network of Amazon resources trying to provide help, but without a single source of truth, it can be hard for interns to keep up with the pre-onboarding timeline, ask questions regarding employment, and learn more about Amazon's culture. Interns often found themselves frustrated over lost emails, lack of direction, and confusion over whether an important date was coming up. The problem is made worse when interns realize that emails are the only method of communication in the pre-onboarding stage, with emails coming from a variety of sources, including third parties.

We found inspiration in their struggle, and asked ourselves:

>How might we build an interactive experience that allows interns to overcome due date anxiety over the duration of their pre-onboarding, and fill the gaps of restless waiting with delightful learning experiences?

## The Solution

With Step to Jeff, we aim to connect interns to that feeling of inclusivity here at Amazon and facilitate communication, rapid exchange of information, and amicable support during the intricate pre-onboarding experience phase through an interactive voice experience.

Step to Jeff is a reminder and educational Alexa Skill that aims to engage and inform interns before they have even stepped foot into Day 1. The skill is divided into tasks to fulfill, consisting of required assignments and/or Amazon culture education. These steps are based off of each intern’s personal timeline in their pre-onboarding process, and they are prompted to fulfill their goals, as well as take initiative, to immerse themselves in legal and educational resources. Through Step to Jeff, interns will be able to immediately understand their prospective goals.

## How does it work?

Step to Jeff utilizes an intern's Gmail account to determine where an intern is in the onboarding process. When an intern sets up the skill by providing us read access to their accounts, Step to Jeff keeps the intern updated by searching the user's account for the relevant onboarding emails, notifying interns when a new email arrives and requires action.

Since this skill was developed by interns (and for interns), we tailored the skill to the emails that received as interns. Below is the full list of emails that we currently search for:

* Offer Letter
* Offer Accepted and Survey
* Offer Survey Confirmation
* Background Check
* Information Session
* Information Session Confirmation
* Manager Introduction
* AWS Educate Course
* New Hire Documents
* Embark
* Equipment Delivery
* I-9 Verification Section 1
* I-9 Verification Section 1 Completion
* New Hire Orientation Info

This list of tasks is turned into an interactive checklist that can automatically advance itself and mark items as complete (for tasks that have a confirmation email), allowing the intern to keep up with the latest information with minimal effort. Each list item is also populated with the relevant information needed to copmplete it, such as access codes and links, so we can present each task in a simplified manner.



<style>
@font-face {
    font-family: 'Ember';
    src: url("fonts/AmazonEmber_Rg.ttf") format("opentype");
}

.markdown-body {
    font-family: 'Ember', sans-serif;
}

.markdown-body h1:first-of-type {
    display: none;
}

.flex-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.flex-container > a {
  background-color: #B8E1EB;
  color: #000;
  width: 170px;
  margin: 10px;
  padding: 10px;
  border-radius: 15px;
  text-align: center;
}

.flex-container .hole {
    height: 12px;
    width: 55px;
    margin: 5px auto 15px auto;
    border-radius: 6px;
    background: white;
}

.flex-container .name {
    font-size: 20px;
    margin: 5px;
}

.flex-container .title {
    margin-top: 0;
    font-size: 14px;
}

.flex-container img {
    width: 130px;
    height: 130px;
    border-radius: 100px;
}

</style>