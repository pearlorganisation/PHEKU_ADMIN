import React from 'react'

const ConfirmDeleteModal = ({ confirmDelete , setShowDeleteModal}) => {
  return (
      <main>
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
              <div className="bg-white p-6 rounded-lg shadow-lg w-80">
                  <h3 className="text-lg font-bold mb-4">Confirm Delete</h3>
                  <p>Are you sure you want to delete this role?</p>
                  <div className="flex justify-end gap-4 mt-6">
                      <button onClick={() => setShowDeleteModal(false)} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Cancel</button>
                      <button onClick={confirmDelete} className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">Delete</button>
                  </div>
              </div>
          </div>
      </main>
     
  )
}

export default ConfirmDeleteModal