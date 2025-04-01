import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Button from '../../components/ui/Button';

export default function AboutPage() {
  return (
    <>
      <Head>
        <title>关于我们 - 中国传统美食博物馆</title>
        <meta name="description" content="中国传统美食博物馆项目介绍、团队信息和联系方式。上海建桥学院国际教育学院本科毕业设计作品。" />
      </Head>
      
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">关于中国传统美食博物馆</h1>
        
        {/* 项目介绍 */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">项目介绍</h2>
            <div className="mt-2 md:mt-0 bg-red-50 text-red-800 px-4 py-2 rounded-md font-medium">
              上海建桥学院（国际教育学院）本科毕业设计作品
            </div>
          </div>
          <p className="text-gray-700 mb-4">
            中国传统美食线上博物馆是一个致力于收集、整理和展示中国各地区特色美食的在线平台。
            本项目旨在通过现代网络技术，以互动性和教育性为核心，向用户展示中华美食文化的丰富多样性和独特魅力。
          </p>
          <p className="text-gray-700 mb-4">
            中国拥有五千多年的饮食文化历史，形成了八大菜系和众多地方特色菜。
            这些美食不仅仅是为了满足人们的味蕾，更承载着丰富的文化内涵和历史价值。
            通过本平台，我们希望能够帮助用户了解这些传统美食背后的故事，传承和弘扬中华饮食文化。
          </p>
          <p className="text-gray-700">
            本项目是上海建桥学院国际教育学院的本科毕业设计作品，结合现代化的前端技术和人工智能技术，
            为用户提供沉浸式的中华美食文化体验。
          </p>
        </div>
        
        {/* 项目功能 */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">主要功能</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start">
              <div className="bg-red-100 rounded-full p-3 text-red-800 mr-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">美食展示</h3>
                <p className="text-gray-600">展示中国各地区特色美食，包括其历史背景、文化意义等内容</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-blue-100 rounded-full p-3 text-blue-800 mr-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">菜谱中心</h3>
                <p className="text-gray-600">提供详细的传统美食制作方法，包括步骤指导和技巧分享</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-green-100 rounded-full p-3 text-green-800 mr-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">地区分类</h3>
                <p className="text-gray-600">按地理区域分类展示美食，帮助用户探索不同地区的饮食文化特点</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-purple-100 rounded-full p-3 text-purple-800 mr-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">AI美食助手</h3>
                <p className="text-gray-600">智能回答用户关于中国美食的问题，提供个性化的美食推荐</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* 学校与项目信息 */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">学校信息</h2>
          <div className="flex flex-col md:flex-row md:items-center md:space-x-8 mb-6">
            <div className="bg-gray-100 p-6 rounded-lg text-center mb-4 md:mb-0 md:w-1/3">
              <h3 className="text-lg font-medium text-gray-800">上海建桥学院</h3>
              <p className="text-sm text-gray-600 mt-1">国际教育学院</p>
            </div>
            <div className="md:w-2/3">
              <p className="text-gray-700 mb-3">
                上海建桥学院是一所具有鲜明应用技术大学特色的全日制民办普通本科高校，坐落于上海浦东新区。
                国际教育学院致力于培养具有国际视野和跨文化交流能力的优秀人才。
              </p>
              <p className="text-gray-700">
                本项目是在学院指导下完成的本科毕业设计，旨在通过互联网技术展示与传承中国传统饮食文化，
                体现了学院对学生创新能力和专业技能的培养。
              </p>
            </div>
          </div>
        </div>
        
      
        {/* 联系信息 */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">联系我们</h2>
          <p className="text-gray-700 mb-6">
            如果您对本项目有任何建议或意见，欢迎通过以下方式联系我们：
          </p>
          
          <div className="space-y-4">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-gray-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span className="text-gray-600">contact@chinesefood-museum.com</span>
            </div>
            <div className="flex items-center">
              <svg className="w-5 h-5 text-gray-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span className="text-gray-600">+86 12345678901</span>
            </div>
            <div className="flex items-center">
              <svg className="w-5 h-5 text-gray-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              <span className="text-gray-600">上海建桥学院 国际教育学院</span>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-gray-500 text-sm mb-4">© 2024 上海建桥学院 国际教育学院 本科毕业设计</p>
            <Link href="/">
              <Button variant="primary">返回首页</Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
} 