// ------------------------------
// Hacker / Terminal themed script
// ------------------------------

const term = document.getElementById('term');
const cmdline = document.getElementById('cmdline');
const cursor = document.getElementById('cursor');

// Keep focus on editable div
term.addEventListener('click', () => cmdline.focus());
cmdline.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    const text = cmdline.innerText.trim();
    if (text) runCmd(text);
    cmdline.innerText = '';
  }
});

function appendLine(html) {
  const d = document.createElement('div');
  d.className = 'term-line';
  d.innerHTML = html;
  term.appendChild(d);
  term.scrollTop = term.scrollHeight;
}

function runCmd(cmd) {
  appendLine(`<span class="hex">&gt; ${escapeHtml(cmd)}</span>`);
  const out = handle(cmd.toLowerCase());
  (out || []).forEach((l) => appendLine(escapeHtml(l)));
}

function handle(cmd) {
  if (cmd === 'help')
    return [
      'help — show commands',
      'whoami — show identity',
      'projects — list projects',
      'resume — show resume info',
      'clear — clear terminal',
      'ls — list files',
    ];
  if (cmd === 'whoami')
    return ['cyber security resercher','from-calicut,kerala'];
  if (cmd === 'projects')
    return ['currently no projects'];
  if (cmd === 'resume')
    return [
      'Name: Akash A',
      'Role: Cybersecurity Researcher',
      'Email: akashanoo124@gmail..com',
    ];
    if (cmd === 'ls')
    return ['resume.txt'];
  if (cmd === 'cat resume.txt')
    return ['Hello, I am Akash A, a passionate Cybersecurity Researcher from Calicut, Kerala.'];
  if (cmd === 'clear') {
    term.innerHTML = '';
    return ['terminal cleared'];
  }
  return [`command not found: ${cmd}`];

}

function typeCmd(cmd) {
  // type into the cmdline quickly and execute
  cmdline.innerText = cmd;
  cmdline.focus();
  // trigger enter
  const e = new KeyboardEvent('keydown', { key: 'Enter' });
  cmdline.dispatchEvent(e);
}

function escapeHtml(txt) {
  return txt.replace(/[&<>"]+/g, function (c) {
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
  });
}

// Simple demo startup typing
(function startup() {
  let seq = [
    'Initializing..',
    'Loading modules [████░░░░]',
    'Environment: stealth',
    'Type help to begin',
  ];
  let i = 0;
  function step() {
    if (i < seq.length) {
      appendLine(seq[i++]);
      setTimeout(step, 450);
    }
  }
  setTimeout(step, 400);
})();

// focus and mobile tweaks
cmdline.focus();
cmdline.innerText = '';
