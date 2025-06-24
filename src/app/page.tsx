'use client';

import { useState, useEffect } from 'react';
import { Task, Priority } from '@/types/task';

// Supabase接続を一時的に無効化
// import { createClient } from '@supabase/supabase-js';
// const supabase = createClient(
//   process.env.NEXT_PUBLIC_SUPABASE_URL!,
//   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
// );

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: 'サンプルタスク1', completed: false, priority: 'high', created_at: new Date().toISOString() },
    { id: 2, title: 'サンプルタスク2', completed: true, priority: 'medium', created_at: new Date().toISOString() },
    { id: 3, title: 'サンプルタスク3', completed: false, priority: 'low', created_at: new Date().toISOString() },
  ]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskPriority, setNewTaskPriority] = useState<Priority>('medium');
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingTitle, setEditingTitle] = useState('');

  // 優先度に応じた色を返す関数
  const getPriorityColor = (priority: Priority) => {
    switch (priority) {
      case 'high':
        return 'text-red-600 bg-red-50 border-red-200';
      case 'medium':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low':
        return 'text-green-600 bg-green-50 border-green-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  // 優先度の表示名を返す関数
  const getPriorityLabel = (priority: Priority) => {
    switch (priority) {
      case 'high':
        return '高';
      case 'medium':
        return '中';
      case 'low':
        return '低';
      default:
        return '中';
    }
  };

  // タスクを優先度順にソートする関数
  const sortTasksByPriority = (tasks: Task[]) => {
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    return [...tasks].sort((a, b) => {
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    });
  };

  // タスクを取得（ローカル状態から）
  const fetchTasks = async () => {
    setLoading(true);
    // ローカル状態を使用するため、何もしない
    setLoading(false);
  };

  // 初回レンダリング時にタスクを取得
  useEffect(() => {
    fetchTasks();
  }, []);

  // 新しいタスクを追加
  const addTask = async () => {
    if (!newTaskTitle.trim()) return;

    const newTask: Task = {
      id: Math.max(...tasks.map(t => t.id || 0), 0) + 1,
      title: newTaskTitle.trim(),
      priority: newTaskPriority,
      completed: false,
      created_at: new Date().toISOString()
    };

    setTasks([...tasks, newTask]);
    setNewTaskTitle('');
    setNewTaskPriority('medium');
  };

  // タスクの完了状態を切り替え
  const toggleTask = async (id: number, completed: boolean) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !completed } : task
    ));
  };

  // タスクを削除
  const deleteTask = async (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  // タスクの編集開始
  const handleEditStart = (task: Task) => {
    setEditingId(task.id || 0);
    setEditingTitle(task.title);
  };

  // タスクの編集保存
  const handleEditSave = async (id: number) => {
    if (!editingTitle.trim()) return;
    
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, title: editingTitle.trim() } : task
    ));
    setEditingId(null);
    setEditingTitle('');
  };

  // タスクの編集キャンセル
  const handleEditCancel = () => {
    setEditingId(null);
    setEditingTitle('');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-gray-100">
          タスクマネージャー
        </h1>
        

        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 mb-8">
          <div className="flex gap-4 mb-4">
            <input
              type="text"
              placeholder="新しいタスクを入力..."
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addTask()}
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
            />
            <select
              value={newTaskPriority}
              onChange={(e) => setNewTaskPriority(e.target.value as Priority)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
            >
              <option value="high">高</option>
              <option value="medium">中</option>
              <option value="low">低</option>
            </select>
            <button
              onClick={addTask}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
            >
              追加
            </button>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">読み込み中...</p>
          </div>
        ) : (
          <div className="space-y-3">
            {sortTasksByPriority(tasks).map((task) => (
              <div
                key={task.id}
                className={`bg-white dark:bg-gray-800 shadow rounded-lg p-4 transition-all ${
                  task.completed ? 'opacity-60' : ''
                }`}
              >
                <div className="flex items-center gap-4">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTask(task.id || 0, task.completed)}
                    className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                  />
                  
                  {editingId === task.id ? (
                    <div className="flex-1 flex gap-2">
                      <input
                        type="text"
                        value={editingTitle}
                        onChange={(e) => setEditingTitle(e.target.value)}
                        className="flex-1 px-3 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleEditSave(task.id || 0);
                          }
                          if (e.key === 'Escape') {
                            e.preventDefault();
                            handleEditCancel();
                          }
                        }}
                        autoFocus
                      />
                      <button
                        onClick={() => handleEditSave(task.id || 0)}
                        className="px-3 py-1 bg-green-500 hover:bg-green-600 text-white rounded text-sm"
                      >
                        保存
                      </button>
                      <button
                        onClick={handleEditCancel}
                        className="px-3 py-1 bg-gray-500 hover:bg-gray-600 text-white rounded text-sm"
                      >
                        キャンセル
                      </button>
                    </div>
                  ) : (
                    <div
                      className={`flex-1 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 p-2 rounded ${
                        task.completed ? 'line-through text-gray-500' : 'text-gray-800 dark:text-gray-200'
                      }`}
                      onClick={() => handleEditStart(task)}
                    >
                      <h3 className="font-medium">{task.title}</h3>
                    </div>
                  )}
                  
                  <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getPriorityColor(task.priority)}`}>
                    {getPriorityLabel(task.priority)}
                  </span>
                  
                  <button
                    onClick={() => deleteTask(task.id || 0)}
                    className="p-2 bg-red-500 hover:bg-red-600 text-white rounded transition-colors"
                    title="削除"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {tasks.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              タスクがありません。新しいタスクを追加してください。
            </p>
          </div>
        )}
      </div>
    </div>
  );
}