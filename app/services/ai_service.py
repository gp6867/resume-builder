import json
import re
from app.config import settings

# Claude API client
try:
    import anthropic
    client = anthropic.Anthropic(api_key=settings.ANTHROPIC_API_KEY) if settings.ANTHROPIC_API_KEY else None
except ImportError:
    client = None


def _has_api_key() -> bool:
    return bool(settings.ANTHROPIC_API_KEY and client)


def _call_claude(prompt: str, max_tokens: int = 2000) -> str:
    """Claude API call karta hai"""
    message = client.messages.create(
        model="claude-opus-4-5",
        max_tokens=max_tokens,
        messages=[{"role": "user", "content": prompt}]
    )
    return message.content[0].text


# ─── Resume Generation ────────────────────────────────────
def generate_resume_ai(data: dict) -> dict:
    """AI se professional resume generate karta hai"""

    if _has_api_key():
        prompt = f"""
You are an expert resume writer. Generate a professional resume for:

Name: {data['full_name']}
Target Job: {data['job_title']}
Years of Experience: {data['years_experience']}
Skills: {', '.join(data['skills'])}
Work Experience: {json.dumps(data.get('work_experience', []))}
Education: {json.dumps(data.get('education', []))}
Job Description (to match): {data.get('job_description', 'Not provided')}

Return ONLY valid JSON with this structure:
{{
    "summary": "3-4 line professional summary",
    "skills": ["skill1", "skill2", ...],
    "work_experience": [
        {{
            "job_title": "...",
            "company": "...",
            "location": "...",
            "start_date": "...",
            "end_date": "...",
            "bullets": ["achievement 1", "achievement 2", "achievement 3"]
        }}
    ],
    "education": [
        {{
            "degree": "...",
            "institution": "...",
            "location": "...",
            "start_date": "...",
            "end_date": "...",
            "gpa": "..."
        }}
    ],
    "tips": ["tip1", "tip2", "tip3"]
}}
"""
        response = _call_claude(prompt, max_tokens=2000)
        # JSON extract karo
        match = re.search(r'\{.*\}', response, re.DOTALL)
        if match:
            return json.loads(match.group())

    # ── Mock Response (jab API key nahi hai) ──
    return {
        "summary": f"Results-driven {data['job_title']} with {data['years_experience']}+ years of experience delivering high-impact solutions. Proven track record in {', '.join(data['skills'][:3])}. Passionate about innovation and continuous improvement.",
        "skills": data['skills'] + ["Problem Solving", "Team Collaboration", "Communication"],
        "work_experience": [
            {
                "job_title": exp.get("job_title", "Software Engineer"),
                "company": exp.get("company", "Tech Company"),
                "location": exp.get("location", "Remote"),
                "start_date": exp.get("start_date", "2022"),
                "end_date": exp.get("end_date", "Present"),
                "bullets": [
                    f"Led development of key features resulting in 40% performance improvement",
                    f"Collaborated with cross-functional teams to deliver projects on time",
                    f"Implemented best practices reducing bug count by 30%"
                ]
            }
            for exp in (data.get('work_experience') or [{"job_title": data['job_title'], "company": "Previous Company", "location": "City", "start_date": "2022", "end_date": "Present"}])
        ],
        "education": data.get('education') or [
            {
                "degree": "Bachelor of Technology",
                "institution": "University Name",
                "location": "City",
                "start_date": "2018",
                "end_date": "2022",
                "gpa": ""
            }
        ],
        "tips": [
            "Add quantifiable achievements (numbers, percentages)",
            "Customize resume for each job application",
            "Keep resume to 1-2 pages maximum"
        ]
    }


# ─── Cover Letter Generation ──────────────────────────────
def generate_cover_letter_ai(data: dict) -> str:
    """AI se cover letter generate karta hai"""

    if _has_api_key():
        prompt = f"""
Write a {data.get('tone', 'professional')} cover letter for:

Applicant: {data['full_name']}
Position: {data['job_title']}
Company: {data['company_name']}
Job Description: {data.get('job_description', 'Not provided')}
Resume Summary: {data.get('resume_summary', 'Not provided')}

Write a compelling 3-paragraph cover letter. Return ONLY the letter text, no extra formatting.
"""
        return _call_claude(prompt, max_tokens=800)

    # ── Mock Response ──
    return f"""Dear Hiring Manager,

I am writing to express my strong interest in the {data['job_title']} position at {data['company_name']}. With my background and passion for delivering exceptional results, I am confident that I would be a valuable addition to your team.

Throughout my career, I have consistently demonstrated the ability to tackle complex challenges and deliver measurable outcomes. My experience aligns well with the requirements of this role, and I am excited about the opportunity to contribute to {data['company_name']}'s continued success and growth.

I would welcome the opportunity to discuss how my skills and experience can benefit {data['company_name']}. Thank you for considering my application. I look forward to speaking with you soon.

Sincerely,
{data['full_name']}
{data['email']}"""


# ─── ATS Score ────────────────────────────────────────────
def calculate_ats_score(resume_text: str, job_description: str) -> dict:
    """Resume ka ATS score calculate karta hai"""

    if _has_api_key() and job_description:
        prompt = f"""
Analyze this resume for ATS (Applicant Tracking System) compatibility.

RESUME:
{resume_text}

JOB DESCRIPTION:
{job_description}

Return ONLY valid JSON:
{{
    "score": <number 0-100>,
    "grade": "<A/B/C/D>",
    "issues": ["issue1", "issue2"],
    "improvements": ["improvement1", "improvement2"],
    "keywords_found": ["keyword1", "keyword2"],
    "keywords_missing": ["keyword1", "keyword2"]
}}
"""
        response = _call_claude(prompt, max_tokens=1000)
        match = re.search(r'\{.*\}', response, re.DOTALL)
        if match:
            return json.loads(match.group())

    # ── Mock ATS Score ──
    # Basic keyword check
    common_keywords = ["experience", "skills", "education", "projects", "achievements"]
    found = [kw for kw in common_keywords if kw.lower() in resume_text.lower()]
    score = min(100, 50 + (len(found) * 10))
    grade = "A" if score >= 85 else "B" if score >= 70 else "C" if score >= 50 else "D"

    return {
        "score": score,
        "grade": grade,
        "issues": [
            "Use standard section headings (Experience, Education, Skills)",
            "Avoid tables and complex formatting",
            "Include more industry-specific keywords"
        ],
        "improvements": [
            "Add measurable achievements with numbers",
            "Match keywords from job description",
            "Use simple bullet points instead of symbols"
        ],
        "keywords_found": found,
        "keywords_missing": ["leadership", "agile", "communication", "teamwork"]
    }
