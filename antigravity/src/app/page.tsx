"use client";

import { useState } from "react";

type TabKey = "plan" | "subagent" | "tool" | "browser";

interface TabContent {
  title: string;
  tag: string;
  tagClass: string;
  lines: Array<{
    type: "prompt" | "tag" | "text" | "highlight" | "success";
    tag?: string;
    tagClass?: string;
    content: string;
  }>;
}

const SIMULATOR_DATA: Record<TabKey, TabContent> = {
  plan: {
    title: "1. Planning & Context Indexing",
    tag: "PLANNING",
    tagClass: "tag-plan",
    lines: [
      { type: "prompt", content: "AGY >>" },
      { type: "tag", tag: "KNOWLEDGE", tagClass: "tag-plan", content: "저장소 지식 아이템(KI) 및 아키텍처 색인 완료" },
      { type: "text", content: "사용자 요청: 'Next.js 기반 고성능 대시보드 및 자율 브라우저 테스트 구축'" },
      { type: "highlight", content: "[1/4] 워크스페이스 구조 및 의존성 트리 분석 (app router, SSR)" },
      { type: "highlight", content: "[2/4] 설계 명세서 및 상태 관리 계획 수립" },
      { type: "success", content: "✓ 태스크 계획 완료. 병렬 서브에이전트 오케스트레이션 개시." },
    ],
  },
  subagent: {
    title: "2. Parallel Subagents Orchestration",
    tag: "SUBAGENTS",
    tagClass: "tag-agent",
    lines: [
      { type: "prompt", content: "AGY >>" },
      { type: "tag", tag: "SUBAGENT-01", tagClass: "tag-agent", content: "컴포넌트 디자인 시스템 및 CSS 모듈 분리 작업 시작" },
      { type: "tag", tag: "SUBAGENT-02", tagClass: "tag-agent", content: "서버 사이드 API 엔드포인트 및 타입 안정성 검증" },
      { type: "text", content: "메인 에이전트와 서브에이전트 간 백그라운드 비동기 컨텍스트 스트리밍..." },
      { type: "highlight", content: "→ Subagent-01: 5개 컴포넌트 생성 완료 (Status: DONE)" },
      { type: "success", content: "✓ 모든 서브에이전트 작업이 메인 브랜치에 안전하게 동기화되었습니다." },
    ],
  },
  tool: {
    title: "3. Autonomous Tool Execution & Self-Healing",
    tag: "TOOLS",
    tagClass: "tag-tool",
    lines: [
      { type: "prompt", content: "AGY >>" },
      { type: "tag", tag: "TOOL_CALL", tagClass: "tag-tool", content: "replace_file_content (src/components/Dashboard.tsx)" },
      { type: "tag", tag: "RUN_COMMAND", tagClass: "tag-tool", content: "npm run build -- --profile" },
      { type: "highlight", content: "Found 1 lint warning: Unused variable 'tempData' at line 42" },
      { type: "text", content: "자동 수정 루프 가동: AST 재분석 및 즉시 셀프 힐링(Self-Healing) 적용..." },
      { type: "success", content: "✓ 빌드 성공 (0 errors, 0 warnings). 번들 크기 38% 최적화 완료." },
    ],
  },
  browser: {
    title: "4. Headless Browser Verification & Visual Testing",
    tag: "BROWSER",
    tagClass: "tag-browser",
    lines: [
      { type: "prompt", content: "AGY >>" },
      { type: "tag", tag: "BROWSER_AGENT", tagClass: "tag-browser", content: "Chromium 인스턴스 기동 (http://localhost:3000)" },
      { type: "text", content: "헤드리스 브라우저 액션: 네비게이션 클릭, 모달 오픈, 다크모드 토글" },
      { type: "highlight", content: "DOM 검사: 레이아웃 시프트(CLS: 0.00), 인터랙션 반응 속도(INP: 18ms)" },
      { type: "tag", tag: "RECORDING", tagClass: "tag-browser", content: "전체 브라우저 상호작용 WebP 비디오 아티팩트 생성 완료" },
      { type: "success", content: "✓ 모든 E2E 사용자 시나리오 완벽 통과. 배포 준비 완료." },
    ],
  },
};

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabKey>("plan");
  const [copied, setCopied] = useState(false);

  const handleCopyCli = () => {
    navigator.clipboard.writeText("npx -y @google/antigravity@latest init");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      {/* Zero-gravity space orbs */}
      <div className="space-orb orb-1" />
      <div className="space-orb orb-2" />

      {/* Global Navbar */}
      <header className="navbar">
        <div className="nav-container">
          <a href="#" className="brand-wrapper">
            <div className="brand-symbol">
              <svg className="symbol-icon" viewBox="0 0 24 24">
                <path d="M12 2L2 19.5h20L12 2zm0 4.2L18.5 17h-13L12 6.2zM11 10v4h2v-4h-2zm0 5v2h2v-2h-2z" />
              </svg>
            </div>
            <span className="brand-name">Google Antigravity</span>
          </a>

          <nav className="nav-menu">
            <a href="#features" className="nav-link">핵심 기능</a>
            <a href="#simulator" className="nav-link">에이전트 데모</a>
            <a href="#comparison" className="nav-link">기존 IDE와의 차이</a>
            <a href="#get-started" className="nav-link">시작하기</a>
          </nav>

          <div>
            <a href="#get-started" className="nav-btn">
              <span>AGY 시작하기</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="hero">
          <div className="hero-pill">
            <span className="pill-glow-dot" />
            Google DeepMind Next-Gen Agentic Platform
          </div>

          <h1 className="hero-title">
            코딩의 중력을 벗어나다,<br />
            <span className="title-gradient">Google Antigravity</span>
          </h1>

          <p className="hero-desc">
            단순한 코드 자동 완성을 넘어섭니다. 스스로 계획하고, 병렬 서브에이전트를 지휘하며,
            실제 브라우저 검증까지 완결 짓는 진정한 자율 페어 프로그래밍의 시대를 경험하세요.
          </p>

          <div className="hero-actions">
            <button onClick={handleCopyCli} className="btn-primary-hero">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
              </svg>
              <span>{copied ? "클립보드에 복사됨!" : "CLI로 즉시 실행하기 (agy)"}</span>
            </button>
            <a href="#simulator" className="btn-secondary-hero">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="5 3 19 12 5 21 5 3"/>
              </svg>
              <span>에이전트 실행 과정 보기</span>
            </a>
          </div>

          {/* Interactive Agent Simulator */}
          <div className="simulator-stage" id="simulator">
            <div className="simulator-glow" />
            <div className="terminal-box">
              <div className="terminal-header">
                <div className="terminal-dots">
                  <span className="t-dot red" />
                  <span className="t-dot yellow" />
                  <span className="t-dot green" />
                </div>
                <div className="terminal-title">
                  <span>antigravity-agentic-runtime — live trace</span>
                </div>
                <div style={{ width: 40 }} />
              </div>

              <div className="terminal-tabs">
                {(["plan", "subagent", "tool", "browser"] as TabKey[]).map((key) => (
                  <button
                    key={key}
                    onClick={() => setActiveTab(key)}
                    className={`tab-btn ${activeTab === key ? "active" : ""}`}
                  >
                    <span>{SIMULATOR_DATA[key].title}</span>
                  </button>
                ))}
              </div>

              <div className="terminal-body">
                {SIMULATOR_DATA[activeTab].lines.map((line, idx) => (
                  <div key={idx} className="code-line">
                    {line.type === "prompt" && <span className="code-prompt">{line.content}</span>}
                    {line.type === "tag" && (
                      <span className={`code-tag ${line.tagClass}`}>{line.tag}</span>
                    )}
                    {line.type === "text" && <span className="code-text">{line.content}</span>}
                    {line.type === "highlight" && <span className="code-highlight">{line.content}</span>}
                    {line.type === "success" && <span className="code-success">{line.content}</span>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="features-section" style={{ paddingBottom: 0 }}>
          <div className="stats-bar">
            <div className="stat-box">
              <div className="stat-val">10x</div>
              <div className="stat-lbl">복잡한 리팩토링 속도 혁신</div>
            </div>
            <div className="stat-box">
              <div className="stat-val">100%</div>
              <div className="stat-lbl">브라우저 기반 자율 E2E 검증</div>
            </div>
            <div className="stat-box">
              <div className="stat-val">Zero</div>
              <div className="stat-lbl">반복 보일러플레이트 부담</div>
            </div>
            <div className="stat-box">
              <div className="stat-val">Deep</div>
              <div className="stat-lbl">Knowledge Item 저장소 지식 색인</div>
            </div>
          </div>
        </section>

        {/* Bento Features Section */}
        <section className="features-section" id="features">
          <div className="section-head">
            <span className="section-badge">CORE CAPABILITIES</span>
            <h2 className="section-title">안티그래비티를 정의하는 5가지 핵심 기둥</h2>
            <p className="section-desc">
              기존 코드 어시스턴트의 한계를 넘어, 개발자의 의도를 온전히 실행 가능한 현실로 구현합니다.
            </p>
          </div>

          <div className="bento-grid">
            {/* Bento Card 1 */}
            <div className="bento-item col-span-2">
              <div>
                <div className="bento-icon-box">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M12 6v6l4 2"/>
                  </svg>
                </div>
                <h3>자율 의사결정 루프 (Autonomous Agent Loop)</h3>
                <p>
                  지시사항을 받으면 단순 텍스트를 출력하는 것에 그치지 않고, 작업 계획 수립부터 파일 탐색,
                  코드 수정, 터미널 명령 실행, 에러 발생 시 자가 치유(Self-Healing)까지 스스로 완결합니다.
                </p>
              </div>

              <div className="agent-loop-visual">
                <div className="loop-step">
                  <span className="step-circle">1</span>
                  <span className="step-label">의도 분석</span>
                </div>
                <span className="loop-arrow">→</span>
                <div className="loop-step">
                  <span className="step-circle">2</span>
                  <span className="step-label">지식 색인</span>
                </div>
                <span className="loop-arrow">→</span>
                <div className="loop-step">
                  <span className="step-circle">3</span>
                  <span className="step-label">도구 실행</span>
                </div>
                <span className="loop-arrow">→</span>
                <div className="loop-step">
                  <span className="step-circle">4</span>
                  <span className="step-label">결과 검증</span>
                </div>
              </div>
            </div>

            {/* Bento Card 2 */}
            <div className="bento-item">
              <div>
                <div className="bento-icon-box">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                    <line x1="8" y1="21" x2="16" y2="21"/>
                    <line x1="12" y1="17" x2="12" y2="21"/>
                  </svg>
                </div>
                <h3>브라우저 서브에이전트</h3>
                <p>
                  작성된 웹 페이지를 실제 Chromium 헤드리스 브라우저 환경에서 렌더링하고,
                  클릭과 인터랙션을 실행하여 이상 여부를 시각적으로 자율 검증합니다.
                </p>
              </div>
              <div className="browser-preview-badge">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                  <polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
                <span>실시간 비디오 녹화 & DOM 상태 검사</span>
              </div>
            </div>

            {/* Bento Card 3 */}
            <div className="bento-item">
              <div>
                <div className="bento-icon-box">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polygon points="12 2 2 7 12 12 22 7 12 2"/>
                    <polyline points="2 17 12 22 22 17"/>
                    <polyline points="2 12 12 17 22 12"/>
                  </svg>
                </div>
                <h3>인터랙티브 아티팩트 & 캔버스</h3>
                <p>
                  대화창에 길게 늘어지는 코드 블록 대신, 우측 보조 패널에 마크다운 리포트,
                  Mermaid 아키텍처 다이어그램, 이미지 뷰어를 깔끔하게 독립 분리하여 제공합니다.
                </p>
              </div>
            </div>

            {/* Bento Card 4 */}
            <div className="bento-item col-span-2">
              <div>
                <div className="bento-icon-box">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                    <circle cx="9" cy="7" r="4"/>
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                  </svg>
                </div>
                <h3>스킬(Skills), 룰(Rules) & MCP 무한 확장</h3>
                <p>
                  프로젝트 폴더 내 <code>.agents/skills</code>, <code>rules</code>를 통해 팀의 컨벤션을 주입하고,
                  표준화된 Model Context Protocol(MCP)을 통해 외부 데이터베이스, 이슈 트래커, 터미널 도구를
                  자유자재로 연동합니다.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Comparison Section */}
        <section className="comparison-section" id="comparison">
          <div className="section-head">
            <span className="section-badge">PARADIGM SHIFT</span>
            <h2 className="section-title">코파일럿에서 에이전트로</h2>
            <p className="section-desc">단순 제안자를 넘어 독립적인 개발 파트너로 진화했습니다.</p>
          </div>

          <div className="comparison-grid">
            <div className="comp-card legacy">
              <span className="comp-tag old">기존 AI 코딩 도구</span>
              <h3 className="comp-title">단순 코드 자동완성 및 제안</h3>
              <ul className="comp-list">
                <li className="comp-item">
                  <span className="item-cross">✕</span>
                  <span>단일 파일 위주의 국소적 컨텍스트 이해</span>
                </li>
                <li className="comp-item">
                  <span className="item-cross">✕</span>
                  <span>사용자가 직접 복사해서 붙여넣고 터미널 명령 실행</span>
                </li>
                <li className="comp-item">
                  <span className="item-cross">✕</span>
                  <span>작성된 UI의 렌더링 결과나 에러를 개발자가 직접 눈으로 확인</span>
                </li>
                <li className="comp-item">
                  <span className="item-cross">✕</span>
                  <span>복잡한 태스크를 만나면 컨텍스트 윈도우 한계로 오류 발생</span>
                </li>
              </ul>
            </div>

            <div className="comp-card antigravity">
              <span className="comp-tag new">GOOGLE ANTIGRAVITY</span>
              <h3 className="comp-title">자율적 오케스트레이션 에이전트</h3>
              <ul className="comp-list">
                <li className="comp-item">
                  <span className="item-check">✓</span>
                  <span><strong>프로젝트 전체 컨텍스트 & KI</strong> 기반 심층 설계</span>
                </li>
                <li className="comp-item">
                  <span className="item-check">✓</span>
                  <span><strong>자율 도구 실행</strong> (파일 수정, 패키지 설치, 빌드 검증 자동화)</span>
                </li>
                <li className="comp-item">
                  <span className="item-check">✓</span>
                  <span><strong>헤드리스 브라우저 검증</strong>을 통한 인터랙션 및 비주얼 E2E 테스트</span>
                </li>
                <li className="comp-item">
                  <span className="item-check">✓</span>
                  <span><strong>병렬 서브에이전트</strong>로 복잡한 태스크를 분할 정복</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="cta-section" id="get-started">
          <div className="cta-card">
            <h2>중력을 거스르는 개발의 시작</h2>
            <p>
              Google DeepMind의 Antigravity로 반복 작업의 무게를 덜고,
              진짜 중요한 아이디어와 제품 가치에 집중하세요.
            </p>

            <button onClick={handleCopyCli} className="btn-primary-hero">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
              </svg>
              <span>{copied ? "클립보드에 복사되었습니다!" : "npx @google/antigravity init"}</span>
            </button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="site-footer">
        <p>Google Antigravity — Next-Generation Agentic Coding Environment by Google DeepMind.</p>
        <p style={{ marginTop: 8, opacity: 0.7 }}>
          Built with Next.js App Router, TypeScript & Zero-Gravity Design System.
        </p>
      </footer>
    </>
  );
}
