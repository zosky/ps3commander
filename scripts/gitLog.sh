#!/bin/bash
# props: https://gist.github.com/varemenos/e95c2e098e657c7688fd
git log --pretty=format:'{%n 
^^^^commit^^^^: ^^^^%H^^^^,%n  
^^^^abbreviated_commit^^^^: ^^^^%h^^^^,%n  
^^^^tree^^^^: ^^^^%T^^^^,%n  
^^^^abbreviated_tree^^^^: ^^^^%t^^^^,%n  
^^^^parent^^^^: ^^^^%P^^^^,%n  
^^^^abbreviated_parent^^^^: ^^^^%p^^^^,%n  
^^^^refs^^^^: ^^^^%D^^^^,%n  
^^^^encoding^^^^: ^^^^%e^^^^,%n  
^^^^subject^^^^: ^^^^%s^^^^,%n  
^^^^sanitized_subject_line^^^^: ^^^^%f^^^^,%n  
^^^^commit_notes^^^^: ^^^^%N^^^^,%n  
^^^^verification_flag^^^^: ^^^^%G?^^^^,%n  
^^^^signer^^^^: ^^^^%GS^^^^,%n  
^^^^signer_key^^^^: ^^^^%GK^^^^,%n  
^^^^author^^^^: {%n    
  ^^^^name^^^^: ^^^^%aN^^^^,%n
  ^^^^date^^^^: ^^^^%aD^^^^%n },%n
^^^^commiter^^^^: {%n
  ^^^^name^^^^: ^^^^%cN^^^^,%n
  ^^^^date^^^^: ^^^^%cD^^^^%n
}%n},' \
    | sed 's/"/\\"/g' \
    | sed 's/\^^^^/"/g' \
    | sed "$ s/,$//" \
    | sed -e ':a' -e 'N' -e '$!ba' -e 's/\n/ /g' \
    | awk 'BEGIN { print("[") } { print($0) } END { print("]") }' \
    > src/store/gitLog.json
git add src/store/gitLog.json
git commit --amend -C HEAD --no-verify