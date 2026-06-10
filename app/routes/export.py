from fastapi import APIRouter
from fastapi.responses import Response
from jinja2 import Template

router = APIRouter()

TEMPLATE = """<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    font-family: Georgia, 'Times New Roman', serif;
    font-size: 11pt;
    color: #111111;
    background: #ffffff;
    padding: 48px;
    max-width: 800px;
    margin: 0 auto;
  }
  h1 {
    font-size: 28pt;
    font-weight: bold;
    color: #111111;
    letter-spacing: 1px;
    margin-bottom: 6px;
  }
  .contact {
    color: #444444;
    font-size: 10pt;
    margin-bottom: 20px;
    display: flex;
    gap: 16px;
    flex-wrap: wrap;
  }
  h2 {
    font-size: 11pt;
    font-weight: bold;
    color: #1a1a2e;
    text-transform: uppercase;
    letter-spacing: 2px;
    border-bottom: 2px solid #1a1a2e;
    padding-bottom: 4px;
    margin: 20px 0 10px 0;
  }
  p { color: #222222; line-height: 1.6; }
  .skill {
    display: inline-block;
    background: #f0f0f5;
    border: 1px solid #cccccc;
    border-radius: 4px;
    padding: 3px 10px;
    font-size: 10pt;
    color: #333333;
    margin: 3px;
  }
  .job-header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-bottom: 6px;
  }
  .job-title {
    font-weight: bold;
    font-size: 11pt;
    color: #111111;
  }
  .company {
    color: #444444;
    font-size: 10pt;
  }
  .date {
    color: #666666;
    font-size: 10pt;
    font-style: italic;
    white-space: nowrap;
  }
  ul {
    margin-left: 20px;
    margin-top: 4px;
  }
  li {
    margin-bottom: 4px;
    line-height: 1.5;
    color: #222222;
    font-size: 10.5pt;
  }
  .edu-row {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
  }
  .degree { font-weight: bold; color: #111111; }
  .institution { color: #444444; }
  .section { margin-bottom: 6px; }
</style>
</head>
<body>
  <h1>{{name}}</h1>
  <div class="contact">
    {% if email %}<span>✉ {{email}}</span>{% endif %}
    {% if phone %}<span>📱 {{phone}}</span>{% endif %}
    {% if location %}<span>📍 {{location}}</span>{% endif %}
  </div>

  {% if summary %}
  <h2>Summary</h2>
  <p>{{summary}}</p>
  {% endif %}

  {% if skills %}
  <h2>Skills</h2>
  <div>{% for s in skills %}<span class="skill">{{s}}</span>{% endfor %}</div>
  {% endif %}

  {% if work_experience %}
  <h2>Experience</h2>
  {% for j in work_experience %}
  <div class="section">
    <div class="job-header">
      <div>
        <span class="job-title">{{j.get('job_title','')}}</span>
        {% if j.get('company') %}<span style="color:#666;margin:0 6px;">|</span><span class="company">{{j.get('company','')}}{% if j.get('location') %}, {{j.get('location','')}}{% endif %}</span>{% endif %}
      </div>
      <span class="date">{{j.get('start_date','')}} – {{j.get('end_date','')}}</span>
    </div>
    {% if j.get('bullets') %}
    <ul>{% for b in j.get('bullets',[]) %}<li>{{b}}</li>{% endfor %}</ul>
    {% elif j.get('description') %}
    <p style="margin-top:4px;">{{j.get('description','')}}</p>
    {% endif %}
  </div>
  {% endfor %}
  {% endif %}

  {% if education %}
  <h2>Education</h2>
  {% for e in education %}
  <div class="section">
    <div class="edu-row">
      <div>
        <span class="degree">{{e.get('degree','')}}</span>
        {% if e.get('institution') %}<span style="color:#666;margin:0 6px;">|</span><span class="institution">{{e.get('institution','')}}{% if e.get('location') %}, {{e.get('location','')}}{% endif %}</span>{% endif %}
      </div>
      <span class="date">{{e.get('start_date','')}} – {{e.get('end_date','')}}</span>
    </div>
    {% if e.get('gpa') %}<p style="color:#555;font-size:10pt;margin-top:2px;">GPA: {{e.get('gpa','')}}</p>{% endif %}
  </div>
  {% endfor %}
  {% endif %}
</body>
</html>"""


@router.post("/preview")
def preview(data: dict):
    resume = data.get("resume", data)
    html = Template(TEMPLATE).render(
        name=resume.get("full_name", ""),
        email=resume.get("email", ""),
        phone=resume.get("phone", ""),
        location=resume.get("location", ""),
        summary=resume.get("summary", ""),
        skills=resume.get("skills", []),
        work_experience=resume.get("work_experience", []),
        education=resume.get("education", [])
    )
    return Response(content=html, media_type="text/html")


@router.post("/pdf")
def export_pdf(data: dict):
    resume = data.get("resume", data)
    html = Template(TEMPLATE).render(
        name=resume.get("full_name", ""),
        email=resume.get("email", ""),
        phone=resume.get("phone", ""),
        location=resume.get("location", ""),
        summary=resume.get("summary", ""),
        skills=resume.get("skills", []),
        work_experience=resume.get("work_experience", []),
        education=resume.get("education", [])
    )
    return Response(
        content=html.encode(),
        media_type="text/html",
        headers={"Content-Disposition": f"attachment; filename=resume.html"}
    )
