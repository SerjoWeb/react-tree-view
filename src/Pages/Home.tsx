import React, { FC, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Button from '../Components/UI/Button';
import useStore from '../Strore/useStore';

const Home: FC = () => {
  const { tree, getTree } = useStore((state) => state);
  const [ refreshMessage, setRefreshMessage ] = useState<string>('');
  const [ treeView, settreeView ] = useState<string[]>([]);

  let currentPath: any;

  const buildTree: any = (tree: any) => {
    return Object.keys(tree).reduce((acc: any, rec: any) => {
      if(tree[rec] && typeof tree[rec] === 'object') {
        return [...acc, {
          key: rec,
          subkey: typeof Object.keys(tree) !== 'object'
            ? Object.keys(tree)
            : buildTree(tree[rec])
        }];
      }
  
      return [...acc, {key: rec}];
    }, []);
  };

  const filePaths = (obj: any, oldKey: any = '', store: any = []) => {
    obj.map((item: any) => {
      if (item.subkey && typeof item.subkey === 'object') {
        item.subkey.map((subItem: any) => {
          item.path = `/${oldKey}/${item.key}`.replaceAll('//', '/');
          subItem.path = `/${oldKey}/${item.key}/${subItem.key}`.replaceAll('//', '/');

          if (subItem.subkey && typeof subItem.subkey === 'object') {
            filePaths(subItem.subkey, `/${item.key}/${subItem.key}`, store);
          }
        });
      }

      item.path = `/${oldKey}/${item.key}`.replaceAll('//', '/');
    });
  
    return obj;
  }

  useEffect(() => {
    getTree();
    settreeView(filePaths(buildTree(tree)));
  }, []);

  const toggleItem = (e: any) => {
    const items = document.getElementsByClassName('item');
    
    for (let item of items) {
      item.classList.remove('selected');
    }

    e.target.classList.add('selected');

    if (e.target.nodeName === 'LI') {
      const fullPathArr = e.target.getAttribute('data-path').split('/');
      const details = document.getElementById('details');
      let search = tree;

      currentPath = fullPathArr;

      for (let i = 0; i < fullPathArr.length; i++) {
        if (fullPathArr[i] !== '') {
          if (fullPathArr[i] in search) {
              search = search[fullPathArr[i]];
          } else {
              return;
          }
        }
      }

      if (details) {
        details.innerHTML = JSON.stringify(search);
      }
    }
  };

  const toggleNestedList = (e: any) => {
    e.target.parentElement.querySelector('.nested').classList.toggle('active');
    e.target.classList.toggle('caret-down');
  };

  const refresh = () => {
    getTree();
    setRefreshMessage('Data has completely refreshed!');

    const details = document.getElementById('details');

    if (details) {
      details.innerHTML = '';
    }

    setTimeout(() => setRefreshMessage(''), 3000);
  };

  // const remove = () => {
  //   console.log('remove');
  //   console.log(currentPath);
  // };

  const renderTree = (treeView: any) => {
    return treeView.length > 0
      ? treeView.map((item: any) => (
        <li
          key={uuidv4()}
          className='item p-[10px] m-[5px] border border-dashed'
          data-path={item.path}
          onClick={(e) => toggleItem(e)}
        >
          {
            item.subkey && item.subkey.length > 0
              ? (
                <>
                  <span className='caret' onClick={(e) => toggleNestedList(e)}>{item.key}</span>
                  <ul className='nested'>
                    {renderTree(item.subkey)}
                  </ul>
                </>
              )
              : item.key
          }
        </li>
      ))
      : (
        <p className='item p-[10px] m-[5px] border border-dashed'>There are no data!</p>
      )
  };

  return (
    <div className='w-full flex justify-center items-start m-0 px-[10px] py-[10px]'>
      <div className='max-w-[1210px] w-full bg-white shadow-xl border border-slate-500 px-[10px] py-[10px]'>
        <div className='flex justify-start items-start flexible-blocks'>
          <div className='flex-1 relative overflow-y-auto px-[10px] py-[10px] border border-slate-500 mr-[5px] h-[400px] relative overflow-y-auto flexible-block'>
            <ul>
              {renderTree(treeView)}
            </ul>
          </div>
          <div className='flex-1 relative overflow-y-auto px-[10px] py-[10px] border border-slate-500 ml-[5px] h-[400px] relative overflow-y-auto flexible-block'>
            <pre id="details"></pre>
          </div>
        </div>
        <div className='flex justify-between items-start mt-[10px]'>
          <div><p className='text-green-700 font-bold'>{refreshMessage}</p></div>
          <div>
            <Button
              name='refresh'
              classProps='mr-[10px]'
              clickHandler={refresh}
              content='Refresh'
              disabled={false}
            />
            {/* <Button
              name='remove'
              classProps=''
              clickHandler={remove}
              content='Remove'
              disabled={false}
            /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
