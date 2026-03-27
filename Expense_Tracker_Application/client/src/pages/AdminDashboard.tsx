import { Link } from "react-router-dom";
import {
  Users,
  TrendingUp,
  TrendingDown,
  DollarSign,
  LayoutDashboard,
  UserCircle,
  Settings,
  List,
  ArrowLeft,
  LogOut,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { useAuthStore } from "../stores/useAuthStore";

// Mock Data
const stats = [
  {
    title: "Tổng User",
    value: "1,234",
    icon: <Users className="h-4 w-4" />,
    trend: "+12% so với tháng trước",
  },
  {
    title: "Giao dịch tháng này",
    value: "567",
    icon: <DollarSign className="h-4 w-4" />,
    trend: "+5% so với tháng trước",
  },
  {
    title: "Tổng Thu hệ thống",
    value: "1.250.000.000 ₫",
    icon: <TrendingUp className="h-4 w-4 text-green-500" />,
    trend: "+18% so với tháng trước",
  },
  {
    title: "Tổng Chi hệ thống",
    value: "850.000.000 ₫",
    icon: <TrendingDown className="h-4 w-4 text-red-500" />,
    trend: "+10% so với tháng trước",
  },
];

const chartData = [
  { name: "T2", thu: 4000000, chi: 2400000 },
  { name: "T3", thu: 3000000, chi: 1398000 },
  { name: "T4", thu: 2000000, chi: 9800000 },
  { name: "T5", thu: 2780000, chi: 3908000 },
  { name: "T6", thu: 1890000, chi: 4800000 },
  { name: "T7", thu: 2390000, chi: 3800000 },
  { name: "CN", thu: 3490000, chi: 4300000 },
];

const recentUsers = [
  {
    id: "USR001",
    name: "Nguyễn Văn A",
    email: "vana@example.com",
    date: "2024-03-20",
    role: "User",
  },
  {
    id: "USR002",
    name: "Trần Thị B",
    email: "thib@example.com",
    date: "2024-03-19",
    role: "User",
  },
  {
    id: "USR003",
    name: "Lê Văn C",
    email: "vanc@example.com",
    date: "2024-03-18",
    role: "Admin",
  },
  {
    id: "USR004",
    name: "Phạm Thị D",
    email: "thid@example.com",
    date: "2024-03-17",
    role: "User",
  },
  {
    id: "USR005",
    name: "Hoàng Văn E",
    email: "vane@example.com",
    date: "2024-03-16",
    role: "User",
  },
];

const navItems = [
  {
    title: "Tổng quan",
    icon: <LayoutDashboard className="h-4 w-4" />,
    active: true,
  },
  { title: "Người dùng", icon: <UserCircle className="h-4 w-4" /> },
  { title: "Danh mục", icon: <List className="h-4 w-4" /> },
  { title: "Cài đặt", icon: <Settings className="h-4 w-4" /> },
];

export default function AdminDashboard() {
  const { logout } = useAuthStore();

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-zinc-50">
        <Sidebar className="border-r border-zinc-200">
          <SidebarHeader className="p-6">
            <h2 className="text-xl font-bold text-zinc-900 flex items-center gap-2">
              <DollarSign className="h-6 w-6 text-zinc-900" />
              ExpenseAdmin
            </h2>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel className="px-6 text-xs font-bold text-zinc-400 uppercase tracking-widest">
                Menu
              </SidebarGroupLabel>
              <SidebarGroupContent className="px-2">
                <SidebarMenu>
                  {navItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        className={
                          item.active
                            ? "bg-zinc-900 text-white hover:bg-zinc-800"
                            : "text-zinc-600 hover:bg-zinc-100"
                        }
                      >
                        {item.icon}
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter className="p-4 space-y-2">
            <Link to="/">
              <SidebarMenuButton className="w-full text-zinc-500 hover:bg-zinc-100">
                <ArrowLeft className="h-4 w-4" />
                <span>Quay lại App</span>
              </SidebarMenuButton>
            </Link>
            <SidebarMenuButton
              className="w-full text-red-500 hover:bg-red-50 hover:text-red-600"
              onClick={() => logout()}
            >
              <LogOut className="h-4 w-4" />
              <span>Đăng xuất</span>
            </SidebarMenuButton>
          </SidebarFooter>
        </Sidebar>

        <main className="flex-1 p-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="sm:hidden" />
              <h1 className="text-2xl font-bold text-zinc-900">
                Tổng quan hệ thống
              </h1>
            </div>
            <div className="text-sm text-zinc-500">
              Cập nhật lần cuối: {new Date().toLocaleTimeString()}
            </div>
          </div>

          {/* Stat Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat) => (
              <Card key={stat.title} className="border-none shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-xs font-bold text-zinc-500 uppercase tracking-wider">
                    {stat.title}
                  </CardTitle>
                  <div className="h-8 w-8 rounded-full bg-zinc-100 flex items-center justify-center">
                    {stat.icon}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-zinc-900">
                    {stat.value}
                  </div>
                  <p className="text-[10px] text-zinc-400 mt-1">{stat.trend}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Chart Section */}
          <Card className="border-none shadow-sm mb-8">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-zinc-900">
                Xu hướng Thu/Chi (7 ngày qua)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[350px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                      stroke="#f0f0f0"
                    />
                    <XAxis
                      dataKey="name"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "#a1a1aa", fontSize: 12 }}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "#a1a1aa", fontSize: 12 }}
                      tickFormatter={(value) => `${value / 1000000}M`}
                    />
                    <Tooltip
                      cursor={{ fill: "#f4f4f5" }}
                      contentStyle={{
                        borderRadius: "12px",
                        border: "none",
                        boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
                      }}
                    />
                    <Legend iconType="circle" />
                    <Bar
                      dataKey="thu"
                      name="Thu nhập"
                      fill="#18181b"
                      radius={[4, 4, 0, 0]}
                    />
                    <Bar
                      dataKey="chi"
                      name="Chi tiêu"
                      fill="#a1a1aa"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Recent Users Table */}
          <Card className="border-none shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg font-bold text-zinc-900">
                Người dùng mới đăng ký
              </CardTitle>
              <SidebarMenuButton className="w-fit text-xs text-zinc-500">
                Xem tất cả
              </SidebarMenuButton>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent border-zinc-100">
                    <TableHead className="font-bold text-zinc-500">
                      ID
                    </TableHead>
                    <TableHead className="font-bold text-zinc-500">
                      Tên
                    </TableHead>
                    <TableHead className="font-bold text-zinc-500">
                      Email
                    </TableHead>
                    <TableHead className="font-bold text-zinc-500">
                      Ngày đăng ký
                    </TableHead>
                    <TableHead className="font-bold text-zinc-500">
                      Role
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentUsers.map((user) => (
                    <TableRow
                      key={user.id}
                      className="border-zinc-100 hover:bg-zinc-50/50 transition-colors"
                    >
                      <TableCell className="font-mono text-xs text-zinc-400">
                        {user.id}
                      </TableCell>
                      <TableCell className="font-bold text-zinc-900">
                        {user.name}
                      </TableCell>
                      <TableCell className="text-zinc-500">
                        {user.email}
                      </TableCell>
                      <TableCell className="text-zinc-500">
                        {user.date}
                      </TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-full text-[10px] font-bold ${
                            user.role === "Admin"
                              ? "bg-zinc-900 text-white"
                              : "bg-zinc-100 text-zinc-600"
                          }`}
                        >
                          {user.role}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </main>
      </div>
    </SidebarProvider>
  );
}
