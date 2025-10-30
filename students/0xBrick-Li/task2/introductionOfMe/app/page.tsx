'use client';

import { useState, useEffect } from 'react';
import { 
  Mail, Phone, MapPin, Github, Linkedin, 
  Code, Database, Server, Award, Briefcase, 
  GraduationCap, Calendar, ChevronRight, Download,
  Cpu, Cloud, GitBranch, Terminal, Sparkles
} from 'lucide-react';

export default function Resume() {
  const [mounted, setMounted] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const personalInfo = {
    name: "李天宇",
    title: "后端开发工程师 | 大数据方向",
    gender: "男",
    age: 22,
    phone: "18871566566",
    emails: ["ltianyu0310@hotmail.com", "geralte_lee@163.com"],
    location: "武汉"
  };

  const education = {
    period: "2022.09 - 至今",
    degree: "计算机科学与技术(大数据方向) | 本科",
    gpa: "3.73 (前20%)",
    courses: [
      { name: "Linux系统编程", score: 95 },
      { name: "算法导论", score: 95 },
      { name: "高性能计算", score: 95 },
      { name: "数据挖掘", score: 95 },
      { name: "大数据平台及应用", score: 87 }
    ]
  };

  const skills = [
    {
      category: "版本控制",
      icon: <GitBranch className="w-5 h-5" />,
      items: ["Git版本控制", "分支管理", "代码提交规范"]
    },
    {
      category: "后端开发",
      icon: <Server className="w-5 h-5" />,
      items: ["Python后端开发", "FastAPI", "RESTful规范", "Redis", "Nginx", "Zookeeper"]
    },
    {
      category: "大数据",
      icon: <Database className="w-5 h-5" />,
      items: ["Hadoop", "MapReduce", "Spark生态系统"]
    },
    {
      category: "编程语言",
      icon: <Code className="w-5 h-5" />,
      items: ["C/C++", "面向对象编程", "内存管理", "底层开发", "SQL"]
    },
    {
      category: "AI/ML",
      icon: <Cpu className="w-5 h-5" />,
      items: ["机器学习算法", "深度学习", "PyTorch"]
    }
  ];

  const projects = [
    {
      period: "2025.08",
      title: "分布式文件系统 (HDFS架构实现)",
      role: "组长",
      responsibilities: ["技术方案设计", "任务协调", "数据节点模块开发"],
      highlights: [
        "参考HDFS架构，设计实现包含客户端、名称节点(主从架构)与数据节点(集群式)的分布式文件系统",
        "基于Zookeeper实现多实例注册与心跳上报",
        "具备数据一致性与高可用性"
      ],
      tags: ["Zookeeper", "分布式系统", "Python", "架构设计"]
    },
    {
      period: "2025.07",
      title: "高并发余额系统API",
      role: "全栈开发",
      responsibilities: ["架构设计", "全流程开发", "性能优化"],
      highlights: [
        "使用FastAPI开发余额系统，支持充值批处理、多用户并发转账及余额查询",
        "使用Nginx实现反向代理与负载均衡",
        "利用Redis进行缓存优化",
        "通过Postman完成接口测试，成功支撑高并发场景"
      ],
      tags: ["FastAPI", "Redis", "Nginx", "高并发", "RESTful"]
    },
    {
      period: "2024.10 - 2024.12",
      title: "Linux Shell 实现",
      role: "独立开发",
      responsibilities: ["系统设计", "底层开发", "调试优化"],
      highlights: [
        "应用动态内存管理技术优化资源分配",
        "使用Linux系统调用实现底层功能",
        "利用GDB进行程序调试",
        "用C语言实现基础功能的Linux Shell，支持基本命令和复杂命令组合"
      ],
      tags: ["C语言", "Linux", "系统编程", "GDB"]
    },
    {
      period: "2024.05 - 2024.06",
      title: "地震数据分析可视化系统",
      role: "数据工程师",
      responsibilities: ["数据清洗", "分布式存储", "可视化开发"],
      highlights: [
        "使用Spark清洗多源地震数据",
        "运用HDFS实现分布式存储",
        "结合plotly构建数据分析可视化系统"
      ],
      tags: ["Spark", "HDFS", "数据分析", "Plotly"]
    }
  ];

  const internship = {
    period: "2025.07 - 2025.08",
    company: "武汉金山云信息技术有限公司",
    position: "星云训练营python方向实习生",
    highlights: [
      "参与后端开发高强度培训，系统学习现代后端开发技术栈",
      "学习高性能Web框架、微服务架构设计、分布式文件系统原理",
      "完成多个后端项目原型开发",
      "担任团队合作项目组长，协调3人团队任务分工与技术方案"
    ],
    skills: ["快速学习能力", "工程实现能力", "领导能力", "团队协作"]
  };

  const strengths = [
    { icon: <Sparkles className="w-5 h-5" />, text: "熟练使用办公软件" },
    { icon: <GraduationCap className="w-5 h-5" />, text: "良好的学习和自主学习能力" },
    { icon: <Briefcase className="w-5 h-5" />, text: "良好的沟通和表达能力" },
    { icon: <Award className="w-5 h-5" />, text: "高效参与团队协作" }
  ];

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* 头部卡片 */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden mb-8 animate-fade-in">
          <div className="relative h-32 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
            <div className="absolute inset-0 bg-black opacity-10"></div>
          </div>
          
          <div className="relative px-8 pb-8">
            <div className="flex items-end -mt-16 mb-6">
              <div className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-800 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-xl">
                <span className="text-4xl font-bold text-white">{personalInfo.name.charAt(0)}</span>
              </div>
              
              <div className="ml-6 mb-2">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                  {personalInfo.name}
                </h1>
                <p className="text-xl text-gradient font-semibold">
                  {personalInfo.title}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="flex items-center text-gray-600 dark:text-gray-300">
                <Phone className="w-4 h-4 mr-2 text-blue-600" />
                <span className="text-sm">{personalInfo.phone}</span>
              </div>
              <div className="flex items-center text-gray-600 dark:text-gray-300">
                <Mail className="w-4 h-4 mr-2 text-blue-600" />
                <span className="text-sm">{personalInfo.emails[0]}</span>
              </div>
              <div className="flex items-center text-gray-600 dark:text-gray-300">
                <MapPin className="w-4 h-4 mr-2 text-blue-600" />
                <span className="text-sm">{personalInfo.location}</span>
              </div>
              <div className="flex items-center text-gray-600 dark:text-gray-300">
                <GraduationCap className="w-4 h-4 mr-2 text-blue-600" />
                <span className="text-sm">GPA: {education.gpa}</span>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <button className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all transform hover:scale-105 flex items-center gap-2">
                <Download className="w-4 h-4" />
                下载简历
              </button>
              <button className="px-6 py-2 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-700 transition-all flex items-center gap-2">
                <Mail className="w-4 h-4" />
                联系我
              </button>
            </div>
          </div>
        </div>

        {/* 教育经历 */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8 animate-slide-up card-hover">
          <h2 className="section-title flex items-center gap-3">
            <GraduationCap className="w-8 h-8 text-blue-600" />
            教育经历
          </h2>
          
          <div className="border-l-4 border-blue-600 pl-6 ml-2">
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-2">
              <Calendar className="w-4 h-4" />
              <span className="font-semibold">{education.period}</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
              {education.degree}
            </h3>
            
            <div className="mb-4">
              <span className="inline-block px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 rounded-lg">
                <span className="text-gray-700 dark:text-gray-200">GPA: </span>
                <span className="font-bold text-blue-600 dark:text-blue-400">{education.gpa}</span>
              </span>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-3">主修课程:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {education.courses.map((course, idx) => (
                  <div key={idx} className="flex justify-between items-center bg-gray-50 dark:bg-gray-700 rounded-lg p-3 hover:shadow-md transition-shadow">
                    <span className="text-gray-700 dark:text-gray-300">{course.name}</span>
                    <span className="font-bold text-blue-600 dark:text-blue-400">{course.score}分</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 技能专长 */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8 animate-slide-up card-hover">
          <h2 className="section-title flex items-center gap-3">
            <Code className="w-8 h-8 text-purple-600" />
            技能专长
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {skills.map((skillGroup, idx) => (
              <div key={idx} className="bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-700 dark:to-gray-600 rounded-xl p-6 hover:shadow-lg transition-all">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg text-white">
                    {skillGroup.icon}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                    {skillGroup.category}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skillGroup.items.map((skill, sidx) => (
                    <span key={sidx} className="px-3 py-1 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm border border-blue-200 dark:border-blue-600 hover:border-blue-400 transition-colors">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 项目经历 */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8 animate-slide-up card-hover">
          <h2 className="section-title flex items-center gap-3">
            <Terminal className="w-8 h-8 text-green-600" />
            项目经历
          </h2>
          
          <div className="space-y-6">
            {projects.map((project, idx) => (
              <div key={idx} className="border-l-4 border-green-600 pl-6 ml-2 pb-6 last:pb-0">
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-2">
                  <Calendar className="w-4 h-4" />
                  <span className="font-semibold">{project.period}</span>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {project.title}
                </h3>
                
                <p className="text-blue-600 dark:text-blue-400 font-semibold mb-3">
                  角色: {project.role}
                </p>

                <div className="mb-3">
                  <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">职责: </span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {project.responsibilities.join(' • ')}
                  </span>
                </div>

                <ul className="space-y-2 mb-4">
                  {project.highlights.map((highlight, hidx) => (
                    <li key={hidx} className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                      <ChevronRight className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, tidx) => (
                    <span key={tidx} className="px-3 py-1 bg-gradient-to-r from-green-100 to-blue-100 dark:from-green-900 dark:to-blue-900 text-green-700 dark:text-green-300 rounded-full text-sm font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 实习经历 */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8 animate-slide-up card-hover">
          <h2 className="section-title flex items-center gap-3">
            <Briefcase className="w-8 h-8 text-orange-600" />
            实习经历
          </h2>
          
          <div className="border-l-4 border-orange-600 pl-6 ml-2">
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-2">
              <Calendar className="w-4 h-4" />
              <span className="font-semibold">{internship.period}</span>
            </div>
            
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
              {internship.company}
            </h3>
            <p className="text-orange-600 dark:text-orange-400 font-semibold mb-4">
              {internship.position}
            </p>

            <ul className="space-y-2 mb-4">
              {internship.highlights.map((highlight, idx) => (
                <li key={idx} className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                  <ChevronRight className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-2">
              {internship.skills.map((skill, idx) => (
                <span key={idx} className="px-3 py-1 bg-gradient-to-r from-orange-100 to-red-100 dark:from-orange-900 dark:to-red-900 text-orange-700 dark:text-orange-300 rounded-full text-sm font-medium">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* 自我评价 */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 animate-slide-up card-hover">
          <h2 className="section-title flex items-center gap-3">
            <Award className="w-8 h-8 text-pink-600" />
            自我评价
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {strengths.map((strength, idx) => (
              <div key={idx} className="flex items-center gap-3 bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20 rounded-lg p-4 hover:shadow-md transition-all">
                <div className="p-2 bg-gradient-to-br from-pink-600 to-purple-600 rounded-lg text-white">
                  {strength.icon}
                </div>
                <span className="text-gray-700 dark:text-gray-300 font-medium">
                  {strength.text}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 页脚 */}
        <div className="mt-12 text-center text-gray-600 dark:text-gray-400">
          <p className="mb-2">© 2025 李天宇. All rights reserved.</p>
          <p className="text-sm">Built with Next.js & Tailwind CSS</p>
        </div>
      </div>
    </div>
  );
}
