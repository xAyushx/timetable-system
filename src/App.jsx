import React, { useState } from 'react';
import './App.css'; 

// --- DATABASE WITH ALL LOGINS ---
const users = {
  'admin': { pass: 'admin123', role: 'overall', dept: 'ALL' },
  'cse': { pass: 'cse123', role: 'dept', dept: 'CSE' },
  'it': { pass: 'it123', role: 'dept', dept: 'IT' },
  'mech': { pass: 'mech123', role: 'dept', dept: 'Mechanical' },
  'civil': { pass: 'civil123', role: 'dept', dept: 'Civil' },
  'aiml': { pass: 'aiml123', role: 'dept', dept: 'AIML' },
  'mnc': { pass: 'mnc123', role: 'dept', dept: 'MnC' },
  'ece': { pass: 'ece123', role: 'dept', dept: 'ECE' },
  'ee': { pass: 'ee123', role: 'dept', dept: 'EE' }
};

const deptColors = {
  'CSE': '#2563eb', 'IT': '#db2777', 'Mechanical': '#ea580c', 'Civil': '#78350f',
  'ECE': '#16a34a', 'EE': '#ca8a04', 'AIML': '#9333ea', 'MnC': '#0d9488'
};

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const timeSlots = [
  '09:00 AM - 10:00 AM', '10:00 AM - 11:00 AM', '11:00 AM - 12:00 PM', 
  '12:00 PM - 01:00 PM', '01:00 PM - 02:00 PM', '02:00 PM - 03:00 PM', 
  '03:00 PM - 04:00 PM', '04:00 PM - 05:00 PM'
];

// --- MASSIVE PRE-FILLED DUMMY DATA ---
const initialTimetables = {
  'MCA 304': {
    'Monday': {
      '11:00 AM - 12:00 PM': { dept: 'IT', subject: 'Software Verif. & Valid. - Dr. Lov Kumar' },
      '01:00 PM - 02:00 PM': { dept: 'CSE', subject: 'Open Elective' },
      '03:00 PM - 04:00 PM': { dept: 'IT', subject: 'Software Verif. & Valid. - Dr. Lov Kumar' },
      '04:00 PM - 05:00 PM': { dept: 'IT', subject: 'Big Data Analytics - Dr. Kuldeep Kumar' }
    },
    'Tuesday': {
      '09:00 AM - 10:00 AM': { dept: 'IT', subject: 'Compiler Design - Dr. Mohit Dua' },
      '10:00 AM - 11:00 AM': { dept: 'IT', subject: 'Software Verif. & Valid. - Dr. Lov Kumar' },
      '11:00 AM - 12:00 PM': { dept: 'IT', subject: 'Distributed Computing - Prof. A.K. Singh' },
      '02:00 PM - 03:00 PM': { dept: 'IT', subject: 'Distributed Computing - Dr. Amandeep Kaur' },
      '03:00 PM - 04:00 PM': { dept: 'IT', subject: 'Dist. Blockchain Tech - Dr. Santosh' },
      '04:00 PM - 05:00 PM': { dept: 'IT', subject: 'Software Verif. & Valid. - Dr. Lov Kumar' }
    },
    'Wednesday': {
      '09:00 AM - 10:00 AM': { dept: 'IT', subject: 'Dist. Blockchain Tech - Dr. Santosh' },
      '10:00 AM - 11:00 AM': { dept: 'IT', subject: 'Compiler Design - Dr. Mohit Dua' },
      '11:00 AM - 12:00 PM': { dept: 'IT', subject: 'Distributed Computing - Prof. A.K. Singh' },
      '02:00 PM - 03:00 PM': { dept: 'IT', subject: 'Dist. Blockchain Tech - Dr. Santosh' },
      '03:00 PM - 04:00 PM': { dept: 'IT', subject: 'Software Verif. & Valid. - Dr. Lov Kumar' },
      '04:00 PM - 05:00 PM': { dept: 'IT', subject: 'Distributed Computing - Dr. Amandeep' }
    },
    'Thursday': {
      '09:00 AM - 10:00 AM': { dept: 'IT', subject: 'Big Data Analytics - Dr. Kuldeep Kumar' },
      '10:00 AM - 11:00 AM': { dept: 'IT', subject: 'Compiler Design - Dr. Mohit Dua' },
      '11:00 AM - 12:00 PM': { dept: 'IT', subject: 'Distributed Computing - Prof. A.K. Singh' },
      '03:00 PM - 04:00 PM': { dept: 'IT', subject: 'Software Verif. & Valid. - Dr. Lov Kumar' },
      '04:00 PM - 05:00 PM': { dept: 'IT', subject: 'Dist. Blockchain Tech - Dr. Santosh' }
    },
    'Friday': {
      '10:00 AM - 11:00 AM': { dept: 'IT', subject: 'Compiler Design - Dr. Mohit Dua' },
      '11:00 AM - 12:00 PM': { dept: 'IT', subject: 'Big Data Analytics - Dr. Kuldeep Kumar' },
      '02:00 PM - 03:00 PM': { dept: 'IT', subject: 'Dist. Blockchain Tech - Dr. Santosh' },
      '03:00 PM - 04:00 PM': { dept: 'IT', subject: 'Big Data Analytics - Dr. Kuldeep Kumar' }
    }
  },
  'MCA 302': {
    'Monday': {
      '09:00 AM - 10:00 AM': { dept: 'Mechanical', subject: 'Thermodynamics - Prof. Sharma' },
      '11:00 AM - 12:00 PM': { dept: 'Mechanical', subject: 'Kinematics - Dr. Verma' },
      '02:00 PM - 03:00 PM': { dept: 'Civil', subject: 'Surveying & Geomatics' },
      '03:00 PM - 04:00 PM': { dept: 'AIML', subject: 'Neural Networks Architecture' }
    },
    'Wednesday': {
      '10:00 AM - 11:00 AM': { dept: 'Civil', subject: 'Fluid Mechanics - Dr. Gupta' },
      '01:00 PM - 02:00 PM': { dept: 'Mechanical', subject: 'Heat & Mass Transfer' },
      '03:00 PM - 04:00 PM': { dept: 'CSE', subject: 'Database Management Systems' }
    },
    'Thursday': {
      '11:00 AM - 12:00 PM': { dept: 'AIML', subject: 'Deep Learning Models' },
      '01:00 PM - 02:00 PM': { dept: 'MnC', subject: 'Stochastic Processes' }
    }
  },
  'LHC 202': {
    'Tuesday': {
      '09:00 AM - 10:00 AM': { dept: 'ECE', subject: 'Signals & Systems' },
      '10:00 AM - 11:00 AM': { dept: 'ECE', subject: 'Digital Logic Design' },
      '12:00 PM - 01:00 PM': { dept: 'EE', subject: 'Power Electronics' },
      '02:00 PM - 03:00 PM': { dept: 'EE', subject: 'Circuit Theory Analysis' }
    },
    'Friday': {
      '09:00 AM - 10:00 AM': { dept: 'CSE', subject: 'Computer Networks' },
      '11:00 AM - 12:00 PM': { dept: 'IT', subject: 'Web Technologies' },
      '02:00 PM - 03:00 PM': { dept: 'AIML', subject: 'Machine Learning Basics' }
    }
  },
  'LHC 101': {
    'Tuesday': {
      '03:00 PM - 04:00 PM': { dept: 'IT', subject: 'Distributed Computing LAB 1 - Prof. A.K.' }
    },
    'Wednesday': {
      '03:00 PM - 04:00 PM': { dept: 'IT', subject: 'Distributed Computing LAB 1 - Prof. A.K.' }
    },
    'Thursday': {
      '03:00 PM - 04:00 PM': { dept: 'IT', subject: 'Distributed Computing LAB 1 - Prof. A.K.' }
    }
  }
};

export default function App() {
  const [user, setUser] = useState(null);
  const [loginForm, setLoginForm] = useState({ id: '', pass: '' });
  const [room, setRoom] = useState('MCA 304');
  const [timetables, setTimetables] = useState(initialTimetables);
  const [modal, setModal] = useState({ isOpen: false, day: '', slot: '', dept: 'CSE', subject: '' });

  // --- LOGIC ---
  const handleLogin = () => {
    const validUser = users[loginForm.id.toLowerCase().trim()];
    if (validUser && validUser.pass === loginForm.pass) setUser(validUser);
    else alert('Invalid Credentials! Please check the ID and password.');
  };

  const openModal = (day, slot, cellData) => {
    setModal({
      isOpen: true, day, slot,
      dept: user.role === 'overall' ? (cellData ? cellData.dept : 'CSE') : user.dept,
      subject: cellData ? cellData.subject : ''
    });
  };

  const saveCell = () => {
    setTimetables(prev => {
      const updated = { ...prev };
      if (!updated[room]) updated[room] = {};
      if (!updated[room][modal.day]) updated[room][modal.day] = {};

      if (modal.subject.trim() === '') delete updated[room][modal.day][modal.slot];
      else updated[room][modal.day][modal.slot] = { dept: modal.dept, subject: modal.subject };
      
      return updated;
    });
    setModal({ ...modal, isOpen: false });
  };

  // --- UI RENDERING ---
  if (!user) {
    return (
      <div className="app-wrapper">
        <div className="container login-container">
          <h2>Timetable Portal</h2>
          <div className="form-group">
            <label>User ID</label>
            <input 
              onChange={e => setLoginForm({ ...loginForm, id: e.target.value })} 
              placeholder="e.g. admin, cse, aiml" 
              onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input 
              type="password" 
              onChange={e => setLoginForm({ ...loginForm, pass: e.target.value })} 
              placeholder="Enter password" 
              onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
            />
          </div>
          <button className="btn-primary" onClick={handleLogin}>Secure Login</button>
          
          <div className="test-accounts">
            <div style={{ marginBottom: '10px', fontWeight: 'bold', color: '#334155' }}>Demo Accounts:</div>
            <div className="account-grid">
              <div><strong>Admin:</strong> admin / admin123</div>
              <div><strong>CSE:</strong> cse / cse123</div>
              <div><strong>IT:</strong> it / it123</div>
              <div><strong>Mech:</strong> mech / mech123</div>
              <div><strong>Civil:</strong> civil / civil123</div>
              <div><strong>AIML:</strong> aiml / aiml123</div>
              <div><strong>MnC:</strong> mnc / mnc123</div>
              <div><strong>ECE:</strong> ece / ece123</div>
              <div><strong>EE:</strong> ee / ee123</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentGrid = timetables[room] || {};

  return (
    <div className="app-wrapper">
      <div className="container">
        <div className="controls-bar no-print">
          <div>
            <span className="user-badge">
              Role: {user.role === 'overall' ? 'Overall Admin' : `${user.dept} Admin`}
            </span>
            <button className="btn-danger" onClick={() => setUser(null)}>Logout</button>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <label style={{ fontWeight: '600', marginRight: '10px', color: '#334155' }}>Room:</label>
            <select 
              value={room} 
              onChange={e => setRoom(e.target.value)} 
              style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
            >
              {Object.keys(initialTimetables).map(r => <option key={r} value={r}>{r}</option>)}
            </select>
            <button className="btn-success" onClick={() => window.print()}>Print / PDF</button>
          </div>
        </div>

        <h2 style={{ textAlign: 'left', marginBottom: '20px' }}>{room} Schedule</h2>

        <div className="table-responsive">
          <table>
            <thead>
              <tr>
                <th style={{ width: '120px' }}>Time / Day</th>
                {days.map(d => <th key={d}>{d}</th>)}
              </tr>
            </thead>
            <tbody>
              {timeSlots.map(slot => (
                <tr key={slot}>
                  <td className="time-slot">{slot}</td>
                  {days.map(day => {
                    const cellData = currentGrid[day]?.[slot] || null;
                    let canEdit = false;
                    let isMasked = false;

                    if (user.role === 'overall') canEdit = true;
                    else if (user.role === 'dept') {
                      if (cellData && cellData.dept === user.dept) canEdit = true;
                      else if (cellData && cellData.dept !== user.dept) isMasked = true;
                    }

                    const cellBg = isMasked ? '#f1f5f9' : (cellData ? '#eff6ff' : 'transparent');
                    const classNames = `cell-content ${canEdit ? 'editable' : (isMasked ? 'readonly' : '')}`;

                    return (
                      <td key={day}>
                        <div className={classNames} onClick={() => canEdit ? openModal(day, slot, cellData) : null} style={{ background: cellBg }}>
                          {cellData ? (
                            isMasked ? (
                              <span style={{ fontStyle: 'italic', color: '#94a3b8' }}>Occupied</span>
                            ) : (
                              <>
                                <span className="dept-badge" style={{ color: deptColors[cellData.dept] || '#333' }}>{cellData.dept}</span>
                                <span style={{ textAlign: 'center' }}>{cellData.subject}</span>
                              </>
                            )
                          ) : null}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Edit Modal */}
        {modal.isOpen && (
          <div className="modal-overlay no-print">
            <div className="modal-content">
              <h3>Edit Slot</h3>
              <p style={{ textAlign: 'center', color: '#64748b', fontSize: '0.875rem', marginBottom: '20px' }}>
                {modal.day} • {modal.slot}
              </p>
              
              {user.role === 'overall' && (
                <div className="form-group">
                  <label>Department</label>
                  <select value={modal.dept} onChange={e => setModal({ ...modal, dept: e.target.value })}>
                    {Object.keys(deptColors).map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
              )}
              
              <div className="form-group">
                <label>Subject & Teacher</label>
                <input 
                  value={modal.subject} 
                  placeholder="e.g. Data Structures - Dr. Smith" 
                  onChange={e => setModal({ ...modal, subject: e.target.value })} 
                  onKeyDown={(e) => e.key === 'Enter' && saveCell()}
                />
              </div>
              
              <div className="modal-actions">
                <button className="btn-save" onClick={saveCell}>Save Changes</button>
                <button className="btn-secondary" onClick={() => setModal({ ...modal, isOpen: false })}>Cancel</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}