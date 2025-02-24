'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.defaultReleaseTypes = exports.defaultChangelogRules = void 0
exports.defaultChangelogRules = {
  feat: { release: 'minor', section: '🚀 Features' },
  fix: { release: 'patch', section: '🐛 Bug Fixes' },
  docs: { release: '', section: '📝 Documentation' },
  refactor: { release: 'patch', section: '♻️ Refactoring' },
  perf: { release: 'patch', section: '⚡ Performance Improvements' },
  test: { release: '', section: '🧪 Tests' },
  chore: { release: '', section: '🛠 Chores' },
}
exports.defaultReleaseTypes = ['major', 'minor', 'patch', 'prerelease']
