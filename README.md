# Close Issue
[![CI](https://github.com/peter-evans/close-issue/workflows/CI/badge.svg)](https://github.com/peter-evans/close-issue/actions?query=workflow%3ACI)
[![GitHub Marketplace](https://img.shields.io/badge/Marketplace-Close%20Issue-blue.svg?colorA=24292e&colorB=0366d6&style=flat&longCache=true&logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAM6wAADOsB5dZE0gAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAERSURBVCiRhZG/SsMxFEZPfsVJ61jbxaF0cRQRcRJ9hlYn30IHN/+9iquDCOIsblIrOjqKgy5aKoJQj4O3EEtbPwhJbr6Te28CmdSKeqzeqr0YbfVIrTBKakvtOl5dtTkK+v4HfA9PEyBFCY9AGVgCBLaBp1jPAyfAJ/AAdIEG0dNAiyP7+K1qIfMdonZic6+WJoBJvQlvuwDqcXadUuqPA1NKAlexbRTAIMvMOCjTbMwl1LtI/6KWJ5Q6rT6Ht1MA58AX8Apcqqt5r2qhrgAXQC3CZ6i1+KMd9TRu3MvA3aH/fFPnBodb6oe6HM8+lYHrGdRXW8M9bMZtPXUji69lmf5Cmamq7quNLFZXD9Rq7v0Bpc1o/tp0fisAAAAASUVORK5CYII=)](https://github.com/marketplace/actions/close-issue)

A GitHub action to close an issue.

## Usage

| :exclamation:  Using this action is no longer necessary   |
|-----------------------------------------------------------|

The same functionality exists in the GitHub CLI. See the documentation [here](https://cli.github.com/manual/gh_issue_close).
```yml
    - name: Close Issue
      run: gh issue close --comment "Auto-closing issue" "1"
      env:
        GH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

If you prefer to use this action:
```yml
      - name: Close Issue
        uses: peter-evans/close-issue@v3
        with:
          issue-number: 1
          comment: Auto-closing issue
```

### Close issues where the title does not match a specified prefix

This is just an example to show one way in which this action can be used.

```yml
on:
  issues:
    types: [opened]
jobs:
  titlePrefixCheck:
    runs-on: ubuntu-latest
    steps:
      - if: startsWith(github.event.issue.title, 'ABC-') != 'true'
        name: Close Issue
        uses: peter-evans/close-issue@v3
        with:
          comment: |
            Issue title must start with 'ABC-'.
            Auto-closing this issue.
```

### Close issue and add label(s)
```yml
      - name: Close Issue
        uses: peter-evans/close-issue@v3
        with:
          issue-number: 1
          comment: Auto-closing issue
          labels: |
            wontfix
```

### Action inputs

| Name | Description | Default |
| --- | --- | --- |
| `token` | `GITHUB_TOKEN` or a `repo` scoped [PAT](https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token). | `GITHUB_TOKEN` |
| `repository` | The GitHub repository containing the issue. | Current repository |
| `issue-number` | The number of the issue to close. | `github.event.issue.number` |
| `close-reason` | Reason for closing the issue; `completed` or `not_planned`. | `completed` |
| `comment` | A comment to make on the issue before closing. | |
| `labels` | A comma or newline separated list of labels. | |

### Accessing issues in other repositories

You can close issues in another repository by using a [PAT](https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token) instead of `GITHUB_TOKEN`.
The user associated with the PAT must have write access to the repository.

## License

[MIT](LICENSE)
