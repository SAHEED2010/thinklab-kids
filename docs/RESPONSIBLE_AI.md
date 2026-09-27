# Responsible AI

ThinkLab Kids is child-facing, so safety is a product requirement rather than a polish item.

## Privacy and data minimization

The hackathon uses fictional learners and local mock data. Do not request names, addresses, school names, contact details, or other identifying information. Do not add production child-data storage, analytics, or profiles in this MVP.

## Child safety and content

Prompts and validation should keep content age appropriate, concise, and non-threatening. Refuse or prevent dangerous, sexual, discriminatory, violent, or adult content. Never expose API credentials, system prompts, internal errors, or hidden instructions.

## Hallucinations and oversight

Model output can be wrong or unsuitable. Constrain output, validate schemas, keep known-answer rules deterministic, and provide a safe failure path. A human should review child-facing prompt and content changes. AI feedback is an activity observation, not a diagnosis.

## Capability observations

It is acceptable to say that a learner used a particular strategy in one activity. It is not acceptable to infer IQ, personality, permanent ability, or labels such as gifted, weak, or incapable. Evidence should be time-bounded, specific, and open to change.

## Bias and language accessibility

Use familiar African contexts naturally and respectfully. Avoid stereotypes and assumptions about a learner's home, language, resources, or ability. Future language and voice work must be evaluated for accessibility, regional variation, and unequal error rates.

## Future guardian requirements

Before production launch, the team needs a clear guardian/parent consent model, age-appropriate design review, retention and deletion policies, access controls, incident response, content moderation, human escalation, and a jurisdiction-aware legal/privacy review. None of those are implied by this prototype.
