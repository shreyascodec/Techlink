import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, FileText, BookOpen, Video, ArrowRight } from 'lucide-react';

const Resources = () => {
  const resources = [
    {
      category: 'Blog',
      icon: FileText,
      items: [
        {
          title: 'The Future of Cloud Computing in 2024',
          excerpt: 'Explore the latest trends and innovations shaping the cloud computing landscape.',
          date: 'March 15, 2024',
          readTime: '5 min read',
        },
        {
          title: 'Data Analytics: Turning Insights into Action',
          excerpt: 'Learn how to leverage data analytics to drive business decisions and growth.',
          date: 'March 10, 2024',
          readTime: '7 min read',
        },
        {
          title: 'Cybersecurity Best Practices for Modern Businesses',
          excerpt: 'Essential security strategies to protect your digital assets and customer data.',
          date: 'March 5, 2024',
          readTime: '6 min read',
        },
      ],
    },
    {
      category: 'Case Studies',
      icon: BookOpen,
      items: [
        {
          title: 'How TechCorp Scaled 10x with Cloud Infrastructure',
          excerpt: 'A detailed look at how we helped a Fortune 500 company transform their infrastructure.',
          date: 'February 28, 2024',
          readTime: '10 min read',
        },
        {
          title: 'DataFlow Inc: Real-Time Analytics Success Story',
          excerpt: 'Discover how we enabled real-time data processing for a leading analytics company.',
          date: 'February 20, 2024',
          readTime: '8 min read',
        },
      ],
    },
    {
      category: 'Webinars',
      icon: Video,
      items: [
        {
          title: 'Digital Transformation Roadmap',
          excerpt: 'Join our experts as they discuss strategies for successful digital transformation.',
          date: 'April 5, 2024',
          readTime: '60 min',
        },
        {
          title: 'Cloud Migration Best Practices',
          excerpt: 'Learn the essential steps and considerations for migrating to the cloud.',
          date: 'March 25, 2024',
          readTime: '45 min',
        },
      ],
    },
    {
      category: 'Whitepapers',
      icon: FileText,
      items: [
        {
          title: 'The Complete Guide to Enterprise Cloud Security',
          excerpt: 'Comprehensive guide covering security best practices for enterprise cloud deployments.',
          date: 'March 1, 2024',
          readTime: '20 min read',
        },
        {
          title: 'AI and Machine Learning in Business Operations',
          excerpt: 'Explore how AI and ML are transforming modern business operations.',
          date: 'February 15, 2024',
          readTime: '25 min read',
        },
      ],
    },
  ];

  return (
    <>
      <Helmet>
        <title>Resources - TechLink</title>
        <meta 
          name="description" 
          content="Access our blog posts, case studies, webinars, and whitepapers to stay informed about the latest technology trends and best practices." 
        />
      </Helmet>
      <div className="pt-28 md:pt-32 pb-24 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Resources & <span className="text-gradient">Insights</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Stay informed with the latest insights, case studies, and best practices from our experts
            </p>
          </motion.div>

          {/* Resources by Category */}
          {resources.map((category, categoryIndex) => {
            const CategoryIcon = category.icon;
            return (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
                className="mb-16"
              >
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                    <CategoryIcon className="w-5 h-5 text-primary-600" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900">{category.category}</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {category.items.map((item, itemIndex) => (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: (categoryIndex * 0.1) + (itemIndex * 0.05) }}
                      whileHover={{ y: -5 }}
                      className="bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all border border-gray-100"
                    >
                      <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                        <Calendar className="w-4 h-4" />
                        <span>{item.date}</span>
                        <span>•</span>
                        <span>{item.readTime}</span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 mb-4 leading-relaxed">
                        {item.excerpt}
                      </p>
                      <Link
                        to="#"
                        className="inline-flex items-center text-primary-600 font-semibold hover:text-primary-700"
                      >
                        Read More
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            );
          })}

          {/* Newsletter CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-primary-600 to-primary-800 rounded-3xl p-12 text-center text-white"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Stay Updated
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Subscribe to our newsletter for the latest insights and updates
            </p>
            <div className="max-w-md mx-auto flex gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Subscribe
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Resources;

