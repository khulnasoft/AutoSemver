'use strict'
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value)
          })
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value))
        } catch (e) {
          reject(e)
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value))
        } catch (e) {
          reject(e)
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected)
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next())
    })
  }
var __generator =
  (this && this.__generator) ||
  function (thisArg, body) {
    var _ = {
        label: 0,
        sent: function () {
          if (t[0] & 1) throw t[1]
          return t[1]
        },
        trys: [],
        ops: [],
      },
      f,
      y,
      t,
      g = Object.create(
        (typeof Iterator === 'function' ? Iterator : Object).prototype,
      )
    return (
      (g.next = verb(0)),
      (g['throw'] = verb(1)),
      (g['return'] = verb(2)),
      typeof Symbol === 'function' &&
        (g[Symbol.iterator] = function () {
          return this
        }),
      g
    )
    function verb(n) {
      return function (v) {
        return step([n, v])
      }
    }
    function step(op) {
      if (f) throw new TypeError('Generator is already executing.')
      while ((g && ((g = 0), op[0] && (_ = 0)), _))
        try {
          if (
            ((f = 1),
            y &&
              (t =
                op[0] & 2
                  ? y['return']
                  : op[0]
                    ? y['throw'] || ((t = y['return']) && t.call(y), 0)
                    : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t
          if (((y = 0), t)) op = [op[0] & 2, t.value]
          switch (op[0]) {
            case 0:
            case 1:
              t = op
              break
            case 4:
              _.label++
              return { value: op[1], done: false }
            case 5:
              _.label++
              y = op[1]
              op = [0]
              continue
            case 7:
              op = _.ops.pop()
              _.trys.pop()
              continue
            default:
              if (
                !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                (op[0] === 6 || op[0] === 2)
              ) {
                _ = 0
                continue
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1]
                break
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1]
                t = op
                break
              }
              if (t && _.label < t[2]) {
                _.label = t[2]
                _.ops.push(op)
                break
              }
              if (t[2]) _.ops.pop()
              _.trys.pop()
              continue
          }
          op = body.call(thisArg, _)
        } catch (e) {
          op = [6, e]
          y = 0
        } finally {
          f = t = 0
        }
      if (op[0] & 5) throw op[1]
      return { value: op[0] ? op[1] : void 0, done: true }
    }
  }
Object.defineProperty(exports, '__esModule', { value: true })
exports.listTags = listTags
exports.compareCommits = compareCommits
exports.createTag = createTag
exports.createRelease = createRelease
var core = require('@actions/core')
var github = require('@actions/github')
var octokit = github.getOctokit(
  core.getInput('github_token', { required: true }),
)
var _a = github.context.repo,
  owner = _a.owner,
  repo = _a.repo
/**
 * Lists all tags in the repository.
 * @param fetchAll - Whether to fetch all available tags.
 * @returns An array of tag objects.
 */
function listTags() {
  return __awaiter(this, arguments, void 0, function (fetchAll) {
    var tags
    if (fetchAll === void 0) {
      fetchAll = false
    }
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          return [
            4 /*yield*/,
            octokit.rest.repos.listTags({
              owner: owner,
              repo: repo,
              per_page: fetchAll ? 100 : 10,
            }),
          ]
        case 1:
          tags = _a.sent().data
          return [2 /*return*/, tags]
      }
    })
  })
}
/**
 * Compares two commits and returns the list of commits between them.
 * @param base - The base commit SHA.
 * @param head - The head commit SHA.
 * @returns An array of commit objects.
 */
function compareCommits(base, head) {
  return __awaiter(this, void 0, void 0, function () {
    var data
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          return [
            4 /*yield*/,
            octokit.rest.repos.compareCommits({
              owner: owner,
              repo: repo,
              base: base,
              head: head,
            }),
          ]
        case 1:
          data = _a.sent().data
          return [2 /*return*/, data.commits]
      }
    })
  })
}
/**
 * Creates a new Git tag in the repository.
 * @param tagName - The name of the new tag.
 * @param commitSha - The commit SHA to tag.
 */
function createTag(tagName, commitSha) {
  return __awaiter(this, void 0, void 0, function () {
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          return [
            4 /*yield*/,
            octokit.rest.git.createRef({
              owner: owner,
              repo: repo,
              ref: 'refs/tags/'.concat(tagName),
              sha: commitSha,
            }),
          ]
        case 1:
          _a.sent()
          core.info('Created new tag: '.concat(tagName))
          return [2 /*return*/]
      }
    })
  })
}
/**
 * Creates a new GitHub release.
 * @param tagName - The tag associated with the release.
 * @param releaseNotes - The release notes.
 */
function createRelease(tagName, releaseNotes) {
  return __awaiter(this, void 0, void 0, function () {
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          return [
            4 /*yield*/,
            octokit.rest.repos.createRelease({
              owner: owner,
              repo: repo,
              tag_name: tagName,
              name: tagName,
              body: releaseNotes,
            }),
          ]
        case 1:
          _a.sent()
          core.info('Created new release: '.concat(tagName))
          return [2 /*return*/]
      }
    })
  })
}
