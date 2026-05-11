export default function ClientDashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Client Portal</h1>
        <p className="text-neutral-400">View your projects, invoices, and files.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-xl">
          <h2 className="text-lg font-semibold mb-4">Active Projects</h2>
          <div className="space-y-4">
            <div className="p-4 bg-neutral-800/50 rounded-lg border border-neutral-700">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium">Website Redesign</h3>
                <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded">Development</span>
              </div>
              <div className="w-full bg-neutral-700 rounded-full h-2 mb-1">
                <div className="bg-blue-500 h-2 rounded-full w-[65%]"></div>
              </div>
              <p className="text-xs text-neutral-400 text-right">65% Complete</p>
            </div>
          </div>
        </div>

        <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-xl">
          <h2 className="text-lg font-semibold mb-4">Recent Files</h2>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 hover:bg-neutral-800 rounded-md transition-colors cursor-pointer">
              <div className="w-8 h-8 bg-purple-500/20 text-purple-400 rounded flex items-center justify-center">
                PDF
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">Brand_Guidelines.pdf</p>
                <p className="text-xs text-neutral-500">2.4 MB • 2 days ago</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-xl">
          <h2 className="text-lg font-semibold mb-4">Pending Invoices</h2>
          <div className="space-y-3">
             <div className="p-4 bg-neutral-800/50 border border-neutral-700 rounded-lg flex justify-between items-center">
               <div>
                 <p className="font-medium text-sm">INV-2026-001</p>
                 <p className="text-xs text-red-400">Due in 3 days</p>
               </div>
               <p className="font-bold">$2,450.00</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
