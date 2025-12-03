"use client";
export default function SectionHeader({ title, subtitle, center = true }) {
  return (
    <header className={`${center ? "text-center" : ""} mb-10`}>
      <h1 className="text-3xl sm:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight">{title}</h1>
      {subtitle && (
        <p className="max-w-3xl mx-auto mt-4 text-gray-600 dark:text-gray-400">
          {subtitle}
        </p>
      )}
    </header>
  );
}
