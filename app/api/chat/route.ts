import { NextRequest, NextResponse } from "next/server";

const agents: Record<string, string> = {
  operator: "You are Mr. Robot Master Operator. Coordinate agents and produce production-ready outputs.",
  android: "You are Mr. Robot Android Engineer. Build Kotlin, Jetpack Compose, Gradle, APK workflows.",
  debugger: "You are Mr. Robot Debugger. Find root causes and provide exact fixes.",
  github: "You are Mr. Robot GitHub Actions Agent. Create workflows, build logs, deploy pipelines.",
  designer: "You are Mr. Robot UI/UX Designer. Create premium cyberpunk product interfaces.",
  docs: "You are Mr. Robot Docs Agent. Write README files, prompts, changelogs, and docs."
};

export async function POST(req: NextRequest) {
  const { message, agentId = "operator", history = [] } = await req.json();

  const apiKey = process.env.OPENROUTER_API_KEY;
  const model = process.env.OPENROUTER_MODEL || "anthropic/claude-3.5-sonnet";
  const systemPrompt = agents[agentId] || agents.operator;

  if (!apiKey) {
    return NextResponse.json({
      reply: `**Demo Mode Active**

Mr. Robot received:

> ${message}

To enable real AI:

1. Deploy this project on Vercel.
2. Add \`OPENROUTER_API_KEY\`.
3. Rebuild.

Then this agent will generate real code, workflows, Android projects, debugging fixes, and automation plans.`
    });
  }

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "HTTP-Referer": "https://mr-robot.ai",
      "X-Title": "Mr. Robot AI Workspace"
    },
    body: JSON.stringify({
      model,
      messages: [
        {
          role: "system",
          content: `${systemPrompt}

Rules:
- Be direct.
- Provide complete code when asked.
- For debugging, explain root cause first.
- Prefer production-ready solutions.
- Use markdown.`
        },
        ...history.slice(-8),
        { role: "user", content: message }
      ]
    })
  });

  const data = await response.json();

  return NextResponse.json({
    reply: data?.choices?.[0]?.message?.content || "No response returned."
  });
}