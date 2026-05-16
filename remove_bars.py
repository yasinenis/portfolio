import re

# Update index.html
with open('/home/yasin/Desktop/portfolio/index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Remove skill-bars
pattern = r'<div class="skill-bar".*?</div>\s*</div>'
content = re.sub(pattern, '', content, flags=re.DOTALL)

# 2. Change Visual Studio Code to VS Code
content = content.replace('<h3>Visual Studio Code</h3>', '<h3>VS Code</h3>')

with open('/home/yasin/Desktop/portfolio/index.html', 'w', encoding='utf-8') as f:
    f.write(content)

# Update style.css
with open('/home/yasin/Desktop/portfolio/css/style.css', 'r', encoding='utf-8') as f:
    css_content = f.read()

# 1. Update .skill-card to be square
old_skill_card = """.skill-card {
    background-color: rgba(255, 255, 255, 0.85);
    border-radius: 8px;
    padding: 20px;
    text-align: center;
    transition: all 0.5s ease;
    backdrop-filter: blur(5px);
    border: 1px solid rgba(0, 123, 255, 0.2);
    box-shadow: 0 8px 32px rgba(31, 38, 135, 0.15);
    opacity: 1;
    transform: translateY(0);
    position: relative;
    overflow: hidden;
}"""

new_skill_card = """.skill-card {
    width: 150px;
    height: 150px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: rgba(255, 255, 255, 0.85);
    border-radius: 8px;
    padding: 20px;
    text-align: center;
    transition: all 0.5s ease;
    backdrop-filter: blur(5px);
    border: 1px solid rgba(0, 123, 255, 0.2);
    box-shadow: 0 8px 32px rgba(31, 38, 135, 0.15);
    opacity: 1;
    transform: translateY(0);
    position: relative;
    overflow: hidden;
}"""
css_content = css_content.replace(old_skill_card, new_skill_card)

# 2. Remove margin-bottom from h3 to perfectly center text + icon
old_h3 = """.skill-card h3 {
    font-size: 18px;
    margin-bottom: 15px;
    color: #333;
    font-weight: 600;
    transition: all 0.3s ease;
}"""
new_h3 = """.skill-card h3 {
    font-size: 18px;
    margin-bottom: 0;
    color: #333;
    font-weight: 600;
    transition: all 0.3s ease;
}"""
css_content = css_content.replace(old_h3, new_h3)

with open('/home/yasin/Desktop/portfolio/css/style.css', 'w', encoding='utf-8') as f:
    f.write(css_content)

print("Done updating index.html and style.css")
