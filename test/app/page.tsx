// app/page.tsx (Sử dụng TypeScript React Component)
'use client'; // Chỉ định đây là Client Component

import { useState } from 'react';

// Định nghĩa kiểu dữ liệu cho một mục công việc
interface Todo {
  id: number;
  text: string;
  isCompleted: boolean;
}

export default function HomePage() {
  // 1. Quản lý trạng thái danh sách công việc (todos)
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: 'Học Next.js cơ bản', isCompleted: false },
    { id: 2, text: 'Tạo ví dụ code đầu tiên', isCompleted: true },
    { id: 3, text: 'Uống cà phê', isCompleted: false },
  ]);

  // 2. State để lưu trữ nội dung công việc mới
  const [newTodo, setNewTodo] = useState('');

  // 3. Hàm xử lý thêm công việc mới
  const handleAddTodo = () => {
    if (newTodo.trim() === '') return;

    const newId = todos.length > 0 ? Math.max(...todos.map(t => t.id)) + 1 : 1;
    const newEntry: Todo = {
      id: newId,
      text: newTodo,
      isCompleted: false,
    };

    setTodos([...todos, newEntry]); // Thêm vào danh sách
    setNewTodo(''); // Xóa nội dung input
  };

  // 4. Hàm xử lý chuyển đổi trạng thái hoàn thành
  const handleToggleComplete = (id: number) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    );
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto', fontFamily: 'Arial' }}>
      <h1>Công Việc Cần Làm (Next.js Example)</h1>

      {/* Input để thêm công việc mới */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Nhập công việc mới..."
          style={{ padding: '10px', flexGrow: 1, border: '1px solid #ccc' }}
        />
        <button
          onClick={handleAddTodo}
          style={{ padding: '10px 15px', backgroundColor: '#0070f3', color: 'white', border: 'none', cursor: 'pointer' }}
        >
          Thêm
        </button>
      </div>

      {/* Danh sách công việc */}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {todos.map((todo) => (
          <li
            key={todo.id}
            style={{
              padding: '10px',
              marginBottom: '8px',
              border: '1px solid #eee',
              borderRadius: '5px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: todo.isCompleted ? '#d4edda' : 'white',
              textDecoration: todo.isCompleted ? 'line-through' : 'none',
            }}
          >
            <span>{todo.text}</span>
            <input
              type="checkbox"
              checked={todo.isCompleted}
              onChange={() => handleToggleComplete(todo.id)}
              style={{ width: '20px', height: '20px', cursor: 'pointer' }}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}