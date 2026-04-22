const USERS = {
  '234501': { pass: 'pass123', role: 'student', name: 'মোঃ রাফি হোসেন', dept: 'ইলেকট্রিক্যাল টেকনোলজি', semester: '৫ম', roll: '234501', gpa: '3.72' },
  '234502': { pass: 'pass123', role: 'student', name: 'নাফিসা আক্তার', dept: 'ইলেকট্রিক্যাল টেকনোলজি', semester: '৫ম', roll: '234502', gpa: '3.85' },
  '234503': { pass: 'pass123', role: 'student', name: 'তানভীর আহমেদ', dept: 'ইলেকট্রিক্যাল টেকনোলজি', semester: '৩য়', roll: '234503', gpa: '3.45' },
  'ADMIN': { pass: 'admin123', role: 'admin', name: 'প্রফেসর করিম স্যার', dept: 'Administration', roll: 'ADMIN' },
};
function login(roll, pass, role) {
  const user = USERS[roll];
  if (!user || user.pass !== pass) return false;
  if (role === 'admin' && user.role !== 'admin') return false;
  if (role === 'student' && user.role !== 'student') return false;
  sessionStorage.setItem('ET67User', JSON.stringify(user));
  return true;
}
function getUser() { const u = sessionStorage.getItem('ET67User'); return u ? JSON.parse(u) : null; }
function logout() { sessionStorage.removeItem('ET67User'); window.location.href = 'index.html'; }
function requireAuth(role) { const user = getUser(); if (!user) { window.location.href = 'index.html'; return null; } if (role && user.role !== role) { window.location.href = 'index.html'; return null; } return user; }
function initSidebar() {
  const toggle = document.getElementById('menuToggle');
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('overlay');
  if (toggle) toggle.addEventListener('click', () => { sidebar.classList.toggle('open'); overlay.classList.toggle('show'); });
  if (overlay) overlay.addEventListener('click', () => { sidebar.classList.remove('open'); overlay.classList.remove('show'); });
  const path = window.location.pathname.split('/').pop();
  document.querySelectorAll('.nav-item').forEach(item => { if (item.dataset.page === path) item.classList.add('active'); });
  const user = getUser();
  if (user) { const nameEl = document.getElementById('sidebarUserName'); const rollEl = document.getElementById('sidebarUserRoll'); if (nameEl) nameEl.textContent = user.name; if (rollEl) rollEl.textContent = 'রোল: ' + user.roll; }
}
function showToast(msg, icon = '✅') {
  let toast = document.getElementById('toast');
  if (!toast) { toast = document.createElement('div'); toast.id = 'toast'; toast.className = 'toast'; document.body.appendChild(toast); }
  toast.innerHTML = `<span>${icon}</span><span>${msg}</span>`;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}
const SUBJECTS = [
  { code: 'EET-501', name: 'ইলেকট্রিক্যাল সার্কিট', credit: 3 },
  { code: 'EET-502', name: 'ইলেকট্রনিক্স', credit: 3 },
  { code: 'EET-503', name: 'পাওয়ার সিস্টেম', credit: 3 },
  { code: 'EET-504', name: 'মেশিনারি', credit: 3 },
  { code: 'EET-505', name: 'কন্ট্রোল সিস্টেম', credit: 2 },
  { code: 'MAT-501', name: 'গণিত (উচ্চতর)', credit: 3 },
];
const ATTENDANCE = [
  { subject: 'ইলেকট্রিক্যাল সার্কিট', total: 45, present: 40, percent: 89 },
  { subject: 'ইলেকট্রনিক্স', total: 42, present: 35, percent: 83 },
  { subject: 'পাওয়ার সিস্টেম', total: 40, present: 38, percent: 95 },
  { subject: 'মেশিনারি', total: 38, present: 28, percent: 74 },
  { subject: 'কন্ট্রোল সিস্টেম', total: 30, present: 27, percent: 90 },
  { subject: 'গণিত (উচ্চতর)', total: 44, present: 36, percent: 82 },
];
const RESULTS = [
  { subject: 'ইলেকট্রিক্যাল সার্কিট', internal: 35, external: 55, total: 90, grade: 'A+', points: 4.0 },
  { subject: 'ইলেকট্রনিক্স', internal: 32, external: 50, total: 82, grade: 'A', points: 3.75 },
  { subject: 'পাওয়ার সিস্টেম', internal: 38, external: 52, total: 90, grade: 'A+', points: 4.0 },
  { subject: 'মেশিনারি', internal: 30, external: 45, total: 75, grade: 'B+', points: 3.25 },
  { subject: 'কন্ট্রোল সিস্টেম', internal: 33, external: 48, total: 81, grade: 'A', points: 3.75 },
  { subject: 'গণিত (উচ্চতর)', internal: 28, external: 44, total: 72, grade: 'B', points: 3.0 },
];
const ASSIGNMENTS = [
  { id: 1, title: 'AC সার্কিট বিশ্লেষণ', subject: 'ইলেকট্রিক্যাল সার্কিট', due: '২৫ এপ্রিল ২০২৫', type: 'assignment', status: 'pending', marks: null },
  { id: 2, title: 'ট্রানজিস্টর বায়াসিং', subject: 'ইলেকট্রনিক্স', due: '২২ এপ্রিল ২০২৫', type: 'assignment', status: 'submitted', marks: 18 },
  { id: 3, title: 'মিড-টার্ম কুইজ', subject: 'পাওয়ার সিস্টেম', due: '২০ এপ্রিল ২০২৫', type: 'quiz', status: 'graded', marks: 22 },
  { id: 4, title: 'মোটর ল্যাব রিপোর্ট', subject: 'মেশিনারি', due: '২৮ এপ্রিল ২০২৫', type: 'report', status: 'pending', marks: null },
  { id: 5, title: 'PID কন্ট্রোলার ডিজাইন', subject: 'কন্ট্রোল সিস্টেম', due: '১৮ এপ্রিল ২০২৫', type: 'assignment', status: 'graded', marks: 28 },
  { id: 6, title: 'ইন্টিগ্রেশন সমস্যা সমাধান', subject: 'গণিত (উচ্চতর)', due: '৩০ এপ্রিল ২০২৫', type: 'assignment', status: 'pending', marks: null },
];
const NOTIFICATIONS = [
  { id: 1, title: 'নতুন ফলাফল প্রকাশিত', desc: '৫ম সেমিস্টারের ফলাফল প্রকাশ হয়েছে।', time: '২ ঘন্টা আগে', type: 'result', icon: '📊', unread: true },
  { id: 2, title: 'পরীক্ষার সময়সূচি', desc: 'ফাইনাল পরীক্ষার রুটিন আপলোড হয়েছে।', time: '৫ ঘন্টা আগে', type: 'exam', icon: '📋', unread: true },
  { id: 3, title: 'অ্যাসাইনমেন্ট জমার শেষ তারিখ', desc: 'AC সার্কিট অ্যাসাইনমেন্ট ২৫ এপ্রিলের মধ্যে জমা দিন।', time: '১ দিন আগে', type: 'assignment', icon: '📝', unread: true },
  { id: 4, title: 'ক্লাস বাতিল', desc: 'আগামীকাল মেশিনারি ক্লাস বাতিল।', time: '১ দিন আগে', type: 'notice', icon: '📢', unread: false },
  { id: 5, title: 'ফি পরিশোধ', desc: 'সেমিস্টার ফি ৩০ এপ্রিলের মধ্যে দিন।', time: '৩ দিন আগে', type: 'payment', icon: '💳', unread: false },
  { id: 6, title: 'বিজ্ঞান মেলা', desc: 'বার্ষিক বিজ্ঞান মেলায় নিবন্ধন করুন।', time: '১ সপ্তাহ আগে', type: 'event', icon: '🔬', unread: false },
];
const SYLLABUS = {
  'EET-501': { name: 'ইলেকট্রিক্যাল সার্কিট', topics: [
    { num: '০১', name: 'DC সার্কিট', desc: 'কির্চহফের সূত্র, নোড ও মেশ বিশ্লেষণ', done: true },
    { num: '০২', name: 'AC সার্কিট', desc: 'সাইনুসয়েডাল তরঙ্গ, ফেজর ডায়াগ্রাম', done: true },
    { num: '০৩', name: 'RLC সার্কিট', desc: 'সিরিজ ও প্যারালেল রেজোন্যান্স', done: true },
    { num: '০৪', name: 'নেটওয়ার্ক থিওরেম', desc: 'থেভেনিন, নর্টন, সুপারপজিশন', done: false },
    { num: '০৫', name: 'ট্রানজিয়েন্ট', desc: 'RC, RL, RLC ট্রানজিয়েন্ট রেসপন্স', done: false },
    { num: '০৬', name: 'ফোর্সড রেসপন্স', desc: 'AC স্টেডি স্টেট অ্যানালাইসিস', done: false },
  ]},
  'EET-503': { name: 'পাওয়ার সিস্টেম', topics: [
    { num: '০১', name: 'পাওয়ার সিস্টেম পরিচিতি', desc: 'জেনারেশন, ট্রান্সমিশন, ডিস্ট্রিবিউশন', done: true },
    { num: '০২', name: 'ট্রান্সফর্মার', desc: 'আদর্শ ও বাস্তব ট্রান্সফর্মার', done: true },
    { num: '০৩', name: 'ট্রান্সমিশন লাইন', desc: 'লাইন প্যারামিটার, লাইন মডেল', done: true },
    { num: '০৪', name: 'লোড ফ্লো', desc: 'গাউস-সাইডেল, নিউটন-রাফসন', done: true },
    { num: '০৫', name: 'ফল্ট অ্যানালাইসিস', desc: 'সিমেট্রিক্যাল ও আনসিমেট্রিক্যাল ফল্ট', done: false },
    { num: '০৬', name: 'স্ট্যাবিলিটি', desc: 'স্ট্যাটিক ও ডায়নামিক স্ট্যাবিলিটি', done: false },
  ]},
};
const STUDENTS_LIST = [
  { roll: '234501', name: 'মোঃ রাফি হোসেন', dept: 'ইলেকট্রিক্যাল', semester: '৫ম', gpa: '3.72', attendance: '87%', status: 'active' },
  { roll: '234502', name: 'নাফিসা আক্তার', dept: 'ইলেকট্রিক্যাল', semester: '৫ম', gpa: '3.85', attendance: '92%', status: 'active' },
  { roll: '234503', name: 'তানভীর আহমেদ', dept: 'ইলেকট্রিক্যাল', semester: '৩য়', gpa: '3.45', attendance: '78%', status: 'active' },
  { roll: '234504', name: 'সুমাইয়া খানম', dept: 'ইলেকট্রিক্যাল', semester: '৫ম', gpa: '3.91', attendance: '96%', status: 'active' },
  { roll: '234505', name: 'আরিফ হোসেন', dept: 'ইলেকট্রিক্যাল', semester: '৩য়', gpa: '3.20', attendance: '70%', status: 'warning' },
  { roll: '234506', name: 'পিয়া রহমান', dept: 'ইলেকট্রিক্যাল', semester: '৫ম', gpa: '3.65', attendance: '88%', status: 'active' },
];
window.ET67 = { login, getUser, logout, requireAuth, initSidebar, showToast, SUBJECTS, ATTENDANCE, RESULTS, ASSIGNMENTS, NOTIFICATIONS, SYLLABUS, STUDENTS_LIST };
