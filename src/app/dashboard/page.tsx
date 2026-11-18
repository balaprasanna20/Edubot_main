"use client";

import React, { useState } from "react";
import Link from "next/link";
import EdubotLogo from "@/components/EdubotLogo";
import {
  LayoutDashboard,
  Users,
  MapPin,
  CalendarCheck,
  BookOpen,
  FileText,
  BarChart3,
  Bell,
  Search,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  ShieldAlert,
  Building,
  GraduationCap,
  Sparkles,
  ChevronRight,
  Filter,
  Check,
  X,
  Plus,
} from "lucide-react";

type RoleType = "super-admin" | "administrator" | "mentor" | "student";

interface RoleConfig {
  id: RoleType;
  title: string;
  badge: string;
  user: {
    name: string;
    email: string;
    avatar: string;
    department: string;
  };
}

const rolesData: Record<RoleType, RoleConfig> = {
  "super-admin": {
    id: "super-admin",
    title: "Super Admin",
    badge: "System Governance",
    user: {
      name: "Dr. Alistair Vance",
      email: "a.vance@codework.edu",
      avatar: "AV",
      department: "Institutional Chancellor & Operations",
    },
  },
  administrator: {
    id: "administrator",
    title: "Administrator",
    badge: "Campus Ops & Geofence",
    user: {
      name: "Meera Krishnan",
      email: "m.krishnan@campus.edu",
      avatar: "MK",
      department: "Campus Administration & Registrar",
    },
  },
  mentor: {
    id: "mentor",
    title: "Mentor / Educator",
    badge: "Teaching & Tasks",
    user: {
      name: "Prof. Arvind Sharma",
      email: "arvind.sharma@faculty.edu",
      avatar: "AS",
      department: "Dept. of Computer Science & Engineering",
    },
  },
  student: {
    id: "student",
    title: "Student",
    badge: "Learning Portal",
    user: {
      name: "Kavya Sundaram",
      email: "kavya.s23@student.edu",
      avatar: "KS",
      department: "B.Tech Computer Science · Year 3 (Batch A)",
    },
  },
};

export default function DashboardPage() {
  const [currentRole, setCurrentRole] = useState<RoleType>("super-admin");
  const [activeTab, setActiveTab] = useState<string>("overview");
  const [pendingLeaves, setPendingLeaves] = useState([
    {
      id: "leave-1",
      student: "Arjun Verma",
      batch: "CS-A",
      type: "Medical Leave",
      duration: "Nov 14 - Nov 16 (3 days)",
      status: "pending",
    },
    {
      id: "leave-2",
      student: "Neha Patel",
      batch: "CS-B",
      type: "Academic Symposium",
      duration: "Nov 15 (1 day)",
      status: "pending",
    },
  ]);

  const handleLeaveAction = (id: string, action: "approved" | "rejected") => {
    setPendingLeaves((prev) =>
      prev.map((l) => (l.id === id ? { ...l, status: action } : l))
    );
  };

  const role = rolesData[currentRole];

  return (
    <div className="min-h-screen bg-[#F8FAFD] flex flex-col font-sans text-navy">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 bg-white border-b border-[#E0E6EF] px-5 sm:px-8 py-3.5 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2 group">
            <EdubotLogo />
          </Link>

          <div className="hidden lg:flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-lg bg-[#EFF5FF] text-primary border border-[#D6E4FF]">
            <Building className="w-3.5 h-3.5" />
            <span>Apex University · Main Campus</span>
          </div>
        </div>

        {/* Global Search Bar */}
        <div className="hidden md:flex items-center relative max-w-sm w-full mx-6">
          <Search className="w-4 h-4 text-secondary absolute left-3.5" />
          <input
            type="text"
            placeholder="Search students, faculty, courses, geofence..."
            className="w-full bg-[#F8FAFD] border border-[#E0E6EF] rounded-xl pl-9 pr-4 py-2 text-xs text-navy placeholder:text-secondary focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
          />
        </div>

        {/* Actions & Profile */}
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="hidden sm:inline-flex text-xs font-semibold text-secondary hover:text-primary transition-colors"
          >
            ← Back to Landing
          </Link>

          <button
            type="button"
            className="relative p-2 text-secondary hover:text-navy rounded-lg hover:bg-[#F8FAFD] transition-colors"
            title="Notifications"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-primary" />
          </button>

          {/* User profile avatar badge */}
          <div className="flex items-center gap-2.5 pl-2 border-l border-[#E0E6EF]">
            <div className="w-8 h-8 rounded-full bg-primary text-white font-bold text-xs flex items-center justify-center">
              {role.user.avatar}
            </div>
            <div className="hidden xl:block text-left">
              <p className="text-xs font-bold text-navy leading-none">
                {role.user.name}
              </p>
              <p className="text-[10px] text-secondary mt-0.5 leading-none">
                {role.title}
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Role Switcher Banner */}
      <div className="bg-white border-b border-[#E0E6EF] px-5 sm:px-8 py-3">
        <div className="max-w-[1360px] mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-secondary uppercase tracking-wider">
              PORTAL SWITCHER:
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {(
              [
                { id: "super-admin", label: "Super Admin", icon: ShieldAlert },
                { id: "administrator", label: "Administrator", icon: Building },
                { id: "mentor", label: "Mentor", icon: GraduationCap },
                { id: "student", label: "Student", icon: Sparkles },
              ] as const
            ).map((item) => {
              const Icon = item.icon;
              const isSelected = currentRole === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentRole(item.id)}
                  type="button"
                  className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    isSelected
                      ? "bg-primary text-white shadow-xs"
                      : "bg-[#F8FAFD] text-navy border border-[#E0E6EF] hover:border-primary/40 hover:text-primary"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Dashboard Layout */}
      <div className="flex-1 max-w-[1360px] w-full mx-auto px-5 sm:px-8 py-6 sm:py-8 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Sidebar Menu */}
        <aside className="lg:col-span-3 xl:col-span-3 flex flex-col gap-5">
          <div className="bg-white rounded-2xl border border-[#E0E6EF] p-5 shadow-xs">
            <div className="pb-4 mb-4 border-b border-[#E0E6EF]">
              <span className="inline-block px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-[#EFF5FF] text-primary mb-2">
                {role.badge}
              </span>
              <h2 className="text-base font-bold text-navy">{role.user.name}</h2>
              <p className="text-xs text-secondary mt-0.5">{role.user.department}</p>
            </div>

            <nav className="space-y-1 text-xs font-semibold">
              <button
                type="button"
                onClick={() => setActiveTab("overview")}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-colors ${
                  activeTab === "overview"
                    ? "bg-[#EFF5FF] text-primary"
                    : "text-navy hover:bg-[#F8FAFD]"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <LayoutDashboard className="w-4 h-4" />
                  <span>Overview & KPIs</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 opacity-60" />
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("attendance")}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-colors ${
                  activeTab === "attendance"
                    ? "bg-[#EFF5FF] text-primary"
                    : "text-navy hover:bg-[#F8FAFD]"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <MapPin className="w-4 h-4" />
                  <span>GPS Geofence</span>
                </div>
                <span className="px-1.5 py-0.5 rounded text-[10px] bg-emerald-100 text-emerald-800 font-bold">
                  Active
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("batches")}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-colors ${
                  activeTab === "batches"
                    ? "bg-[#EFF5FF] text-primary"
                    : "text-navy hover:bg-[#F8FAFD]"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Users className="w-4 h-4" />
                  <span>Users & Batches</span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("teaching")}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-colors ${
                  activeTab === "teaching"
                    ? "bg-[#EFF5FF] text-primary"
                    : "text-navy hover:bg-[#F8FAFD]"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <FileText className="w-4 h-4" />
                  <span>Lessons & Tasks</span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("materials")}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-colors ${
                  activeTab === "materials"
                    ? "bg-[#EFF5FF] text-primary"
                    : "text-navy hover:bg-[#F8FAFD]"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <BookOpen className="w-4 h-4" />
                  <span>Study Materials</span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("leave")}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-colors ${
                  activeTab === "leave"
                    ? "bg-[#EFF5FF] text-primary"
                    : "text-navy hover:bg-[#F8FAFD]"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <CalendarCheck className="w-4 h-4" />
                  <span>Leave Approvals</span>
                </div>
                <span className="px-1.5 py-0.5 rounded text-[10px] bg-amber-100 text-amber-800 font-bold">
                  2
                </span>
              </button>
            </nav>
          </div>

          {/* Quick Geofence Indicator Card */}
          <div className="bg-[#EFF5FF] border border-[#D6E4FF] rounded-2xl p-4 text-xs">
            <div className="flex items-center gap-2 mb-2 font-bold text-primary">
              <MapPin className="w-4 h-4" />
              <span>Campus Geofence: Active</span>
            </div>
            <p className="text-secondary leading-relaxed text-[11px]">
              Geofence radius set to 750m around Main Campus Center. Verified check-in enforcement enabled.
            </p>
          </div>
        </aside>

        {/* Right Dashboard Work Area */}
        <main className="lg:col-span-9 xl:col-span-9 flex flex-col gap-6">
          {/* Header Banner */}
          <div className="bg-white rounded-2xl border border-[#E0E6EF] p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold text-primary uppercase tracking-wide">
                  {role.title} Workspace
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              </div>
              <h1 className="text-2xl font-bold text-navy tracking-tight">
                {currentRole === "super-admin" && "Institutional Governance & System Health"}
                {currentRole === "administrator" && "Campus Operations & Live Attendance"}
                {currentRole === "mentor" && "Teaching Hub, Lessons & Submissions"}
                {currentRole === "student" && "My Learning, Timetable & Verified Progress"}
              </h1>
              <p className="text-xs sm:text-sm text-secondary mt-1">
                Real-time synchronized data across schools, colleges, and university departments.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-white text-xs font-semibold shadow-xs hover:bg-primary-hover transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>
                  {currentRole === "student" ? "Upload Task" : "Quick Action"}
                </span>
              </button>
            </div>
          </div>

          {/* Role-Specific KPI Cards */}
          {currentRole === "super-admin" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-[#E0E6EF] shadow-xs">
                <span className="text-[11px] font-bold text-secondary uppercase">
                  Connected Institutions
                </span>
                <p className="text-3xl font-bold text-navy mt-1">4 Campuses</p>
                <p className="text-[11px] text-emerald-600 font-semibold mt-1">
                  100% Operational Status
                </p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-[#E0E6EF] shadow-xs">
                <span className="text-[11px] font-bold text-secondary uppercase">
                  Total Active Students
                </span>
                <p className="text-3xl font-bold text-navy mt-1">14,280</p>
                <p className="text-[11px] text-primary font-semibold mt-1">
                  +8.4% Enrollment this term
                </p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-[#E0E6EF] shadow-xs">
                <span className="text-[11px] font-bold text-secondary uppercase">
                  Geofence Accuracy
                </span>
                <p className="text-3xl font-bold text-navy mt-1">99.4%</p>
                <p className="text-[11px] text-emerald-600 font-semibold mt-1">
                  GPS polygon validated
                </p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-[#E0E6EF] shadow-xs">
                <span className="text-[11px] font-bold text-secondary uppercase">
                  Active Mentors
                </span>
                <p className="text-3xl font-bold text-navy mt-1">340</p>
                <p className="text-[11px] text-secondary font-semibold mt-1">
                  Across 38 course batches
                </p>
              </div>
            </div>
          )}

          {currentRole === "administrator" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-[#E0E6EF] shadow-xs">
                <span className="text-[11px] font-bold text-secondary uppercase">
                  Today&apos;s Verified Check-ins
                </span>
                <p className="text-3xl font-bold text-navy mt-1">1,412</p>
                <p className="text-[11px] text-emerald-600 font-semibold mt-1">
                  96.8% Campus attendance
                </p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-[#E0E6EF] shadow-xs">
                <span className="text-[11px] font-bold text-secondary uppercase">
                  Pending Leave Queue
                </span>
                <p className="text-3xl font-bold text-navy mt-1">
                  {pendingLeaves.filter((l) => l.status === "pending").length}
                </p>
                <p className="text-[11px] text-amber-600 font-semibold mt-1">
                  Requires admin sign-off
                </p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-[#E0E6EF] shadow-xs">
                <span className="text-[11px] font-bold text-secondary uppercase">
                  Scheduled Batches
                </span>
                <p className="text-3xl font-bold text-navy mt-1">28</p>
                <p className="text-[11px] text-primary font-semibold mt-1">
                  All classrooms assigned
                </p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-[#E0E6EF] shadow-xs">
                <span className="text-[11px] font-bold text-secondary uppercase">
                  Geofence Radius
                </span>
                <p className="text-3xl font-bold text-navy mt-1">750m</p>
                <p className="text-[11px] text-emerald-600 font-semibold mt-1">
                  Perimeter secure
                </p>
              </div>
            </div>
          )}

          {currentRole === "mentor" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-[#E0E6EF] shadow-xs">
                <span className="text-[11px] font-bold text-secondary uppercase">
                  Lectures Today
                </span>
                <p className="text-3xl font-bold text-navy mt-1">3 Classes</p>
                <p className="text-[11px] text-primary font-semibold mt-1">
                  Next: CS-302 @ 11:30 AM
                </p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-[#E0E6EF] shadow-xs">
                <span className="text-[11px] font-bold text-secondary uppercase">
                  Submissions To Review
                </span>
                <p className="text-3xl font-bold text-navy mt-1">14</p>
                <p className="text-[11px] text-amber-600 font-semibold mt-1">
                  Assignment 3: Data Structures
                </p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-[#E0E6EF] shadow-xs">
                <span className="text-[11px] font-bold text-secondary uppercase">
                  Study Materials
                </span>
                <p className="text-3xl font-bold text-navy mt-1">26 Files</p>
                <p className="text-[11px] text-emerald-600 font-semibold mt-1">
                  Download DRM protected
                </p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-[#E0E6EF] shadow-xs">
                <span className="text-[11px] font-bold text-secondary uppercase">
                  Batch Average Grade
                </span>
                <p className="text-3xl font-bold text-navy mt-1">87.4%</p>
                <p className="text-[11px] text-emerald-600 font-semibold mt-1">
                  +3.2% vs midterm
                </p>
              </div>
            </div>
          )}

          {currentRole === "student" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-primary/30 shadow-xs ring-1 ring-primary/20">
                <span className="text-[11px] font-bold text-primary uppercase">
                  Attendance Status
                </span>
                <div className="flex items-center gap-2 mt-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <p className="text-lg font-bold text-navy">Verified Present</p>
                </div>
                <p className="text-[11px] text-secondary font-medium mt-1">
                  Geofence Check-in @ 08:42 AM
                </p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-[#E0E6EF] shadow-xs">
                <span className="text-[11px] font-bold text-secondary uppercase">
                  Overall Attendance
                </span>
                <p className="text-3xl font-bold text-navy mt-1">96.5%</p>
                <p className="text-[11px] text-emerald-600 font-semibold mt-1">
                  Above 85% requirement
                </p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-[#E0E6EF] shadow-xs">
                <span className="text-[11px] font-bold text-secondary uppercase">
                  Pending Tasks
                </span>
                <p className="text-3xl font-bold text-navy mt-1">2 Tasks</p>
                <p className="text-[11px] text-amber-600 font-semibold mt-1">
                  Due tomorrow at 5:00 PM
                </p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-[#E0E6EF] shadow-xs">
                <span className="text-[11px] font-bold text-secondary uppercase">
                  Current Term GPA
                </span>
                <p className="text-3xl font-bold text-navy mt-1">3.88</p>
                <p className="text-[11px] text-primary font-semibold mt-1">
                  Top 5% of Department
                </p>
              </div>
            </div>
          )}

          {/* Interactive Core Module Widget */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
            {/* Left Main Card: Role-Specific Action Board */}
            <div className="xl:col-span-8 bg-white rounded-2xl border border-[#E0E6EF] p-6 shadow-xs">
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#E0E6EF]">
                <h3 className="text-base font-bold text-navy">
                  {currentRole === "super-admin" && "Institutional Campus Nodes & Access"}
                  {currentRole === "administrator" && "GPS-Verified Attendance Live Feed"}
                  {currentRole === "mentor" && "Active Tasks & Student Submissions"}
                  {currentRole === "student" && "My Course Timetable & Schedule"}
                </h3>
                <span className="text-xs text-secondary font-medium flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-primary" />
                  <span>Real-time Sync</span>
                </span>
              </div>

              {/* Administrator Geofence Live Table */}
              {currentRole === "administrator" && (
                <div className="space-y-3">
                  {[
                    {
                      name: "Aditya Nair",
                      role: "Student",
                      batch: "CS-2023",
                      location: "North Gate Entrance",
                      time: "08:44 AM",
                      status: "GPS Verified",
                    },
                    {
                      name: "Prof. Arvind Sharma",
                      role: "Mentor",
                      batch: "Faculty",
                      location: "Computer Dept. Hall",
                      time: "08:35 AM",
                      status: "GPS Verified",
                    },
                    {
                      name: "Pooja Reddy",
                      role: "Student",
                      batch: "CS-2024",
                      location: "Central Library Wing",
                      time: "08:31 AM",
                      status: "GPS Verified",
                    },
                    {
                      name: "Vikram Malhotra",
                      role: "Student",
                      batch: "CS-2023",
                      location: "Main Gateway",
                      time: "08:27 AM",
                      status: "GPS Verified",
                    },
                  ].map((log, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-[#F8FAFD] border border-[#E0E6EF] flex items-center justify-between gap-4 text-xs"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-[#EFF5FF] text-primary flex items-center justify-center font-bold">
                          {log.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-navy">{log.name}</p>
                          <p className="text-secondary text-[11px]">
                            {log.role} · {log.batch}
                          </p>
                        </div>
                      </div>

                      <div className="hidden sm:block text-right">
                        <p className="font-semibold text-navy">{log.location}</p>
                        <p className="text-secondary text-[11px]">{log.time}</p>
                      </div>

                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 font-bold text-[10px] border border-emerald-200">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>{log.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Super Admin Institutions Overview */}
              {currentRole === "super-admin" && (
                <div className="space-y-3">
                  {[
                    {
                      name: "Engineering & Applied Sciences Campus",
                      students: "6,200",
                      mentors: "140",
                      health: "Optimal (99.8%)",
                      geofence: "Active",
                    },
                    {
                      name: "Medical & Health Sciences College",
                      students: "3,800",
                      mentors: "95",
                      health: "Optimal (99.5%)",
                      geofence: "Active",
                    },
                    {
                      name: "School of Business & Economics",
                      students: "2,900",
                      mentors: "70",
                      health: "Optimal (99.9%)",
                      geofence: "Active",
                    },
                    {
                      name: "Law & Humanities Institute",
                      students: "1,380",
                      mentors: "35",
                      health: "Optimal (99.1%)",
                      geofence: "Active",
                    },
                  ].map((camp, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-[#F8FAFD] border border-[#E0E6EF] flex items-center justify-between gap-4 text-xs"
                    >
                      <div className="flex items-center gap-3">
                        <Building className="w-5 h-5 text-primary" />
                        <div>
                          <p className="font-bold text-navy">{camp.name}</p>
                          <p className="text-secondary text-[11px]">
                            {camp.students} Students · {camp.mentors} Mentors
                          </p>
                        </div>
                      </div>

                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 font-bold text-[10px] border border-emerald-200">
                        <span>{camp.health}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Mentor Lessons & Review */}
              {currentRole === "mentor" && (
                <div className="space-y-3">
                  {[
                    {
                      course: "CS-302: Algorithms & Complexity",
                      topic: "Dynamic Programming & Graph DAGs",
                      time: "11:30 AM - 01:00 PM",
                      room: "Auditorium Hall 4",
                      submissions: "34 / 40 Submitted",
                    },
                    {
                      course: "CS-201: Data Structures",
                      topic: "Self-balancing Red-Black Trees",
                      time: "02:00 PM - 03:30 PM",
                      room: "Lab 3 (System Workstation)",
                      submissions: "38 / 38 Submitted",
                    },
                    {
                      course: "CS-405: Distributed Systems",
                      topic: "Raft Consensus Protocol Review",
                      time: "04:00 PM - 05:30 PM",
                      room: "Seminar Room B",
                      submissions: "18 / 22 Submitted",
                    },
                  ].map((lesson, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-[#F8FAFD] border border-[#E0E6EF] flex items-center justify-between gap-4 text-xs"
                    >
                      <div>
                        <p className="font-bold text-navy">{lesson.course}</p>
                        <p className="text-secondary text-[11px]">{lesson.topic}</p>
                      </div>

                      <div className="hidden sm:block text-right">
                        <p className="font-semibold text-navy">{lesson.time}</p>
                        <p className="text-secondary text-[11px]">{lesson.room}</p>
                      </div>

                      <div className="px-2.5 py-1 rounded-lg bg-[#EFF5FF] text-primary font-bold text-[11px]">
                        {lesson.submissions}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Student Schedule & Classes */}
              {currentRole === "student" && (
                <div className="space-y-3">
                  {[
                    {
                      time: "09:00 AM - 10:30 AM",
                      subject: "CS-301 Operating Systems",
                      prof: "Dr. K. Raman",
                      status: "Completed",
                      attended: true,
                    },
                    {
                      time: "11:30 AM - 01:00 PM",
                      subject: "CS-302 Algorithms & Complexity",
                      prof: "Prof. Arvind Sharma",
                      status: "Next Class",
                      attended: true,
                    },
                    {
                      time: "02:00 PM - 03:30 PM",
                      subject: "CS-201 Data Structures Lab",
                      prof: "Prof. Arvind Sharma",
                      status: "Scheduled",
                      attended: false,
                    },
                  ].map((cls, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-[#F8FAFD] border border-[#E0E6EF] flex items-center justify-between gap-4 text-xs"
                    >
                      <div>
                        <p className="font-bold text-navy">{cls.subject}</p>
                        <p className="text-secondary text-[11px]">
                          {cls.prof} · {cls.time}
                        </p>
                      </div>

                      <div
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                          cls.status === "Completed"
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                            : cls.status === "Next Class"
                            ? "bg-[#EFF5FF] text-primary border-[#D6E4FF]"
                            : "bg-slate-100 text-slate-700 border-slate-200"
                        }`}
                      >
                        {cls.status === "Completed" && <Check className="w-3 h-3" />}
                        <span>{cls.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Right Side Card: Interactive Actions & Leave Queue */}
            <div className="xl:col-span-4 bg-white rounded-2xl border border-[#E0E6EF] p-6 shadow-xs flex flex-col justify-between">
              <div>
                <h3 className="text-base font-bold text-navy mb-4">
                  {currentRole === "administrator"
                    ? "Leave Approval Requests"
                    : currentRole === "student"
                    ? "Pending Assignments"
                    : "Campus Notice Board"}
                </h3>

                {currentRole === "administrator" && (
                  <div className="space-y-3">
                    {pendingLeaves.map((leave) => (
                      <div
                        key={leave.id}
                        className="p-3.5 rounded-xl bg-[#F8FAFD] border border-[#E0E6EF] text-xs"
                      >
                        <div className="flex items-center justify-between font-bold text-navy mb-1">
                          <span>{leave.student}</span>
                          <span className="text-[10px] text-secondary font-medium">
                            {leave.batch}
                          </span>
                        </div>
                        <p className="text-secondary text-[11px] mb-1">
                          {leave.type}
                        </p>
                        <p className="text-secondary text-[10px] mb-3">
                          {leave.duration}
                        </p>

                        {leave.status === "pending" ? (
                          <div className="flex items-center gap-2 pt-1 border-t border-[#E0E6EF]">
                            <button
                              type="button"
                              onClick={() => handleLeaveAction(leave.id, "approved")}
                              className="flex-1 py-1 px-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-[11px] flex items-center justify-center gap-1 transition-colors"
                            >
                              <Check className="w-3 h-3" />
                              <span>Approve</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => handleLeaveAction(leave.id, "rejected")}
                              className="py-1 px-2.5 rounded-lg bg-white border border-[#E0E6EF] hover:bg-rose-50 hover:text-rose-600 text-secondary font-semibold text-[11px] flex items-center justify-center gap-1 transition-colors"
                            >
                              <X className="w-3 h-3" />
                              <span>Reject</span>
                            </button>
                          </div>
                        ) : (
                          <span
                            className={`inline-block px-2.5 py-0.5 rounded text-[10px] font-bold ${
                              leave.status === "approved"
                                ? "bg-emerald-100 text-emerald-800"
                                : "bg-rose-100 text-rose-800"
                            }`}
                          >
                            {leave.status.toUpperCase()}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {currentRole === "student" && (
                  <div className="space-y-3">
                    <div className="p-3.5 rounded-xl bg-[#F8FAFD] border border-[#E0E6EF] text-xs">
                      <div className="flex items-center justify-between font-bold text-navy mb-1">
                        <span>Assignment 3: Red-Black Trees</span>
                        <span className="text-amber-600 text-[10px] font-bold">
                          Due Tomorrow
                        </span>
                      </div>
                      <p className="text-secondary text-[11px] mb-2">
                        CS-201 Data Structures Lab
                      </p>
                      <button
                        type="button"
                        className="w-full py-1.5 rounded-lg bg-primary hover:bg-primary-hover text-white text-xs font-semibold transition-colors"
                      >
                        Submit Solution
                      </button>
                    </div>

                    <div className="p-3.5 rounded-xl bg-[#F8FAFD] border border-[#E0E6EF] text-xs">
                      <div className="flex items-center justify-between font-bold text-navy mb-1">
                        <span>Seminar Paper: Raft Protocol</span>
                        <span className="text-secondary text-[10px] font-bold">
                          Due Nov 20
                        </span>
                      </div>
                      <p className="text-secondary text-[11px] mb-2">
                        CS-405 Distributed Systems
                      </p>
                      <button
                        type="button"
                        className="w-full py-1.5 rounded-lg bg-white border border-primary text-primary hover:bg-[#EFF5FF] text-xs font-semibold transition-colors"
                      >
                        View Guidelines
                      </button>
                    </div>
                  </div>
                )}

                {(currentRole === "super-admin" || currentRole === "mentor") && (
                  <div className="space-y-3 text-xs">
                    <div className="p-3.5 rounded-xl bg-[#F8FAFD] border border-[#E0E6EF]">
                      <p className="font-bold text-navy mb-1">
                        Term Final Examination Circular
                      </p>
                      <p className="text-secondary text-[11px] leading-relaxed">
                        Fall 2026 semester assessment schedules released for all academic departments.
                      </p>
                      <span className="text-[10px] text-primary font-semibold mt-2 inline-block">
                        Issued by Registrar Office
                      </span>
                    </div>

                    <div className="p-3.5 rounded-xl bg-[#F8FAFD] border border-[#E0E6EF]">
                      <p className="font-bold text-navy mb-1">
                        Geofence Policy Update
                      </p>
                      <p className="text-secondary text-[11px] leading-relaxed">
                        Automatic geofence check-in buffer adjusted to 10 minutes around lecture halls.
                      </p>
                      <span className="text-[10px] text-primary font-semibold mt-2 inline-block">
                        Campus Ops Verified
                      </span>
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-4 mt-4 border-t border-[#E0E6EF] text-center">
                <Link
                  href="/"
                  className="text-xs font-semibold text-primary hover:underline"
                >
                  Return to Edubot Marketing Landing Page →
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
