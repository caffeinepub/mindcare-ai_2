# MindCare AI

## Current State
New project. No existing features.

## Requested Changes (Diff)

### Add
- User authentication (signup/login with consent step)
- Daily mood check-in: 1-10 scale, emotion tags (Calm, Happy, Anxious, Neutral, Sad), optional notes
- Supportive rule-based chat interface with crisis detection (keyword-based: suicide, kill myself, end life, hopeless) that surfaces helpline numbers and disables normal flow
- Self-help suggestions (breathing exercises, journaling prompts, short walks, hydration reminder) shown based on mood
- Weekly progress line chart showing mood scores over the last 7 days
- Dashboard with greeting, mood check-in card, support chat card, weekly progress card, self-help suggestions card
- Resources section with mental health tips and community help

### Modify
N/A

### Remove
N/A

## Implementation Plan
1. Backend: user profiles with consent flag, mood entries (score, emotion tags, notes, timestamp), chat messages (user + bot, timestamp), query APIs for weekly mood data
2. Authorization component for login/signup
3. Frontend: Dashboard page, mood check-in form, chat bubble UI, weekly line chart (Recharts), self-help suggestions panel, crisis detection in chat logic, resources section, nav + footer matching design
