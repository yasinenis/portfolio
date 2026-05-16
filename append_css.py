with open('/home/yasin/Desktop/portfolio/css/style.css', 'a', encoding='utf-8') as f:
    f.write("""
/* Yeni Eklenen Yetenekler İcin Renkler */
.skill-js:hover { border: 1px solid rgba(247, 223, 30, 0.7) !important; }
.skill-node:hover { border: 1px solid rgba(51, 153, 51, 0.7) !important; }
.skill-mongodb:hover { border: 1px solid rgba(71, 162, 72, 0.7) !important; }
.skill-mongoose:hover { border: 1px solid rgba(136, 0, 0, 0.7) !important; }
.skill-github:hover { border: 1px solid rgba(24, 23, 23, 0.7) !important; }
.skill-vscode:hover { border: 1px solid rgba(0, 122, 204, 0.7) !important; }
.skill-vs:hover { border: 1px solid rgba(92, 45, 145, 0.7) !important; }
.skill-gtest:hover { border: 1px solid rgba(15, 157, 88, 0.7) !important; }
.skill-docs:hover { border: 1px solid rgba(255, 153, 0, 0.7) !important; }

.skill-js:hover h3 { color: #F7DF1E !important; }
.skill-node:hover h3 { color: #339933 !important; }
.skill-mongodb:hover h3 { color: #47A248 !important; }
.skill-mongoose:hover h3 { color: #880000 !important; }
.skill-github:hover h3 { color: #181717 !important; }
.skill-vscode:hover h3 { color: #007ACC !important; }
.skill-vs:hover h3 { color: #5C2D91 !important; }
.skill-gtest:hover h3 { color: #0F9D58 !important; }
.skill-docs:hover h3 { color: #FF9900 !important; }

.fab.fa-js { color: #F7DF1E; }
.fab.fa-node-js { color: #339933; }
.skill-mongodb .fas.fa-leaf { color: #47A248; }
.skill-mongoose .fas.fa-database { color: #880000; }
.skill-github .fab.fa-github { color: #181717; }
.skill-vscode .fas.fa-code { color: #007ACC; }
.skill-vs .fas.fa-laptop-code { color: #5C2D91; }
.skill-gtest .fas.fa-vial { color: #0F9D58; }
.skill-docs .fas.fa-book { color: #FF9900; }

.skill-js .skill-level { background: linear-gradient(90deg, #F7DF1E, #f9e85e); }
.skill-node .skill-level { background: linear-gradient(90deg, #339933, #5cb85c); }
.skill-mongodb .skill-level { background: linear-gradient(90deg, #47A248, #60c161); }
.skill-mongoose .skill-level { background: linear-gradient(90deg, #880000, #b30000); }
.skill-github .skill-level { background: linear-gradient(90deg, #181717, #3b3a3a); }
.skill-vscode .skill-level { background: linear-gradient(90deg, #007ACC, #3399ff); }
.skill-vs .skill-level { background: linear-gradient(90deg, #5C2D91, #8548c7); }
.skill-gtest .skill-level { background: linear-gradient(90deg, #0F9D58, #30c279); }
.skill-docs .skill-level { background: linear-gradient(90deg, #FF9900, #ffb84d); }
""")
print("CSS appended.")
