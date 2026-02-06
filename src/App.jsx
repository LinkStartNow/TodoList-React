import { useState, useEffect } from 'react';
import { FaPlus, FaTrash, FaEdit, FaCheck } from 'react-icons/fa';
import './App.css';

function App() {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem('todos');
    return saved ? JSON.parse(saved) : [];
  });
  const [inputValue, setInputValue] = useState('');
  const [inputPriority, setInputPriority] = useState('medium'); // 默认中优先级
  
  // 编辑状态
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState('');

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const completedCount = todos.filter(t => t.completed).length;
  const uncompletedCount = todos.length - completedCount;

  const handleAddTodo = () => {
    if (inputValue.trim() === '') {
      alert('请输入任务内容');
      return;
    }

    const newTodo = {
      id: Date.now(),
      text: inputValue.trim(),
      completed: false,
      priority: inputPriority
    };

    setTodos([newTodo, ...todos]);
    setInputValue('');
    setInputPriority('medium'); // 重置优先级
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleAddTodo();
    }
  };

  const handleDeleteTodo = (id) => {
    if (confirm('确定要删除这个任务吗？')) {
      setTodos(todos.filter(todo => todo.id !== id));
    }
  };

  const handleToggleTodo = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const handleClearCompleted = () => {
    if (completedCount > 0 && confirm('确定要清空所有已完成的任务吗？')) {
      setTodos(todos.filter(todo => !todo.completed));
    }
  };

  const handleClearAll = () => {
    if (todos.length > 0 && confirm('⚠️ 警告：确定要清空所有任务吗？此操作不可恢复！')) {
      setTodos([]);
    }
  };

  // 开始编辑
  const startEditing = (todo) => {
    setEditingId(todo.id);
    setEditingText(todo.text);
  };

  // 保存编辑
  const saveEditing = (id) => {
    if (editingText.trim() === '') {
      alert('任务内容不能为空');
      return;
    }
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, text: editingText.trim() } : todo
    ));
    setEditingId(null);
    setEditingText('');
  };

  // 取消编辑
  const cancelEditing = () => {
    setEditingId(null);
    setEditingText('');
  };

  const getPriorityLabel = (priority) => {
    const map = {
      high: '高',
      medium: '中',
      low: '低'
    };
    return map[priority] || '中';
  };

  return (
    <div className="container">
      <header>
        <h1>📝 我的待办清单</h1>
        <div className="stats">
          <span>已完成: <span id="completed-count">{completedCount}</span></span>
          <span>未完成: <span id="uncompleted-count">{uncompletedCount}</span></span>
        </div>
      </header>

      <div className="input-group">
        <select 
          className={`priority-select priority-${inputPriority}`}
          value={inputPriority} 
          onChange={(e) => setInputPriority(e.target.value)}
          title="设置优先级"
        >
          <option value="high">高</option>
          <option value="medium">中</option>
          <option value="low">低</option>
        </select>
        <input 
          type="text" 
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="今天要做什么？" 
          autoComplete="off"
        />
        <button id="add-btn" onClick={handleAddTodo}>
          <FaPlus />
        </button>
      </div>

      <ul id="todo-list">
        {todos.map(todo => (
          <li key={todo.id} className={`${todo.completed ? 'completed' : ''} priority-border-${todo.priority || 'medium'}`}>
            <input 
              type="checkbox" 
              className="todo-checkbox" 
              checked={todo.completed} 
              onChange={() => handleToggleTodo(todo.id)}
            />
            
            {editingId === todo.id ? (
              <div className="edit-group">
                <input 
                  type="text" 
                  className="edit-input"
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') saveEditing(todo.id);
                    if (e.key === 'Escape') cancelEditing();
                  }}
                  autoFocus
                />
                <button className="save-btn" onClick={() => saveEditing(todo.id)} title="保存">
                  <FaCheck />
                </button>
              </div>
            ) : (
              <>
                <span className={`priority-tag priority-${todo.priority || 'medium'}`}>
                  {getPriorityLabel(todo.priority || 'medium')}
                </span>
                <span 
                  className="todo-text" 
                  onDoubleClick={() => startEditing(todo)}
                  title="双击可以编辑"
                >
                  {todo.text}
                </span>
                <div className="action-buttons">
                  <button 
                    className="edit-btn" 
                    title="编辑任务"
                    onClick={() => startEditing(todo)}
                  >
                    <FaEdit />
                  </button>
                  <button 
                    className="delete-btn" 
                    title="删除任务"
                    onClick={() => handleDeleteTodo(todo.id)}
                  >
                    <FaTrash />
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
      
      <div className="footer-actions">
        {completedCount > 0 && (
          <button className="clear-btn clear-completed" onClick={handleClearCompleted}>
            清空已完成
          </button>
        )}
        
        {todos.length > 0 && (
          <button className="clear-btn clear-all" onClick={handleClearAll}>
            全部清空
          </button>
        )}
      </div>

      {todos.length === 0 && (
        <div id="empty-state">
          <p>🎉 还没有任务，享受你的自由时光吧！</p>
          <p className="sub-text">或者添加一个新任务开始忙碌？✨</p>
        </div>
      )}
    </div>
  );
}

export default App;
