import re

with open('/home/yasin/Desktop/portfolio/index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update navigation order
nav_pattern = r'(<li><a href="#hakkimda">.*?</a></li>\s*)(<li><a href="#yetenekler">.*?</a></li>\s*)(<li><a href="#projelerim">.*?</a></li>\s*)'
def nav_repl(m):
    return m.group(1) + m.group(3) + m.group(2)
content = re.sub(nav_pattern, nav_repl, content)

# 2. Move #projelerim section to be after #hakkimda
hakkimda_pattern = r'(<section id="hakkimda" class="section">.*?</section>\s*)'
projelerim_pattern = r'(<section id="projelerim" class="section">.*?</section>\s*)'

proj_match = re.search(projelerim_pattern, content, re.DOTALL)
if proj_match:
    proj_text = proj_match.group(1)
    # Remove from original place
    content = content.replace(proj_text, '')
    
    # Insert after hakkimda
    hak_match = re.search(hakkimda_pattern, content, re.DOTALL)
    if hak_match:
        hak_text = hak_match.group(1)
        content = content.replace(hak_text, hak_text + proj_text)

# 3. Add skills
js_skill = """
                    <div class="skill-card skill-js">
                        <div class="skill-icon">
                            <i class="fab fa-js"></i>
                        </div>
                        <h3>JavaScript</h3>
                        <div class="skill-bar" data-level="50%">
                            <div class="skill-level skill-level-50"></div>
                        </div>
                    </div>"""
content = content.replace('<h3>Python</h3>\n                        <div class="skill-bar" data-level="25%">\n                            <div class="skill-level skill-level-25"></div>\n                        </div>\n                    </div>', '<h3>Python</h3>\n                        <div class="skill-bar" data-level="25%">\n                            <div class="skill-level skill-level-25"></div>\n                        </div>\n                    </div>' + js_skill)

node_skill = """
                    <div class="skill-card skill-node">
                        <div class="skill-icon">
                            <i class="fab fa-node-js"></i>
                        </div>
                        <h3>Node.js</h3>
                        <div class="skill-bar" data-level="50%">
                            <div class="skill-level skill-level-50"></div>
                        </div>
                    </div>"""
content = content.replace('<h3>CSS3</h3>\n                        <div class="skill-bar" data-level="50%">\n                            <div class="skill-level skill-level-50"></div>\n                        </div>\n                    </div>', '<h3>CSS3</h3>\n                        <div class="skill-bar" data-level="50%">\n                            <div class="skill-level skill-level-50"></div>\n                        </div>\n                    </div>' + node_skill)


mongo_skill = """
                    <div class="skill-card skill-mongodb">
                        <div class="skill-icon">
                            <i class="fas fa-leaf"></i>
                        </div>
                        <h3>MongoDB</h3>
                        <div class="skill-bar" data-level="50%">
                            <div class="skill-level skill-level-50"></div>
                        </div>
                    </div>
                    
                    <div class="skill-card skill-mongoose">
                        <div class="skill-icon">
                            <i class="fas fa-database"></i>
                        </div>
                        <h3>Mongoose</h3>
                        <div class="skill-bar" data-level="50%">
                            <div class="skill-level skill-level-50"></div>
                        </div>
                    </div>"""
content = content.replace('<h3>MySQL</h3>\n                        <div class="skill-bar" data-level="50%">\n                            <div class="skill-level skill-level-50"></div>\n                        </div>\n                    </div>', '<h3>MySQL</h3>\n                        <div class="skill-bar" data-level="50%">\n                            <div class="skill-level skill-level-50"></div>\n                        </div>\n                    </div>' + mongo_skill)


tools_skills = """
                    <div class="skill-card skill-github">
                        <div class="skill-icon">
                            <i class="fab fa-github"></i>
                        </div>
                        <h3>GitHub</h3>
                        <div class="skill-bar" data-level="75%">
                            <div class="skill-level skill-level-75"></div>
                        </div>
                    </div>
                    
                    <div class="skill-card skill-vscode">
                        <div class="skill-icon">
                            <i class="fas fa-code"></i>
                        </div>
                        <h3>Visual Studio Code</h3>
                        <div class="skill-bar" data-level="75%">
                            <div class="skill-level skill-level-75"></div>
                        </div>
                    </div>
                    
                    <div class="skill-card skill-vs">
                        <div class="skill-icon">
                            <i class="fas fa-laptop-code"></i>
                        </div>
                        <h3>Visual Studio</h3>
                        <div class="skill-bar" data-level="50%">
                            <div class="skill-level skill-level-50"></div>
                        </div>
                    </div>
                    
                    <div class="skill-card skill-gtest">
                        <div class="skill-icon">
                            <i class="fas fa-vial"></i>
                        </div>
                        <h3>Google Test</h3>
                        <div class="skill-bar" data-level="25%">
                            <div class="skill-level skill-level-25"></div>
                        </div>
                    </div>
                    
                    <div class="skill-card skill-docs">
                        <div class="skill-icon">
                            <i class="fas fa-book"></i>
                        </div>
                        <h3>Documentation</h3>
                        <div class="skill-bar" data-level="50%">
                            <div class="skill-level skill-level-50"></div>
                        </div>
                    </div>"""
content = content.replace('<h3>Linux</h3>\n                        <div class="skill-bar" data-level="25%">\n                            <div class="skill-level skill-level-25"></div>\n                        </div>\n                    </div>', '<h3>Linux</h3>\n                        <div class="skill-bar" data-level="25%">\n                            <div class="skill-level skill-level-25"></div>\n                        </div>\n                    </div>' + tools_skills)

with open('/home/yasin/Desktop/portfolio/index.html', 'w', encoding='utf-8') as f:
    f.write(content)
print("Done modifying index.html")
